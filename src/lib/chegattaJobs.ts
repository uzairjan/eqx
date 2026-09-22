/**
 * Chegatta public job-board API client.
 *
 * Powers the live vacancies list and real applications on this site.
 * Configuration (all optional):
 *   VITE_CHEGATTA_API_URL     base URL, defaults to the live platform
 *   VITE_EQX_BUSINESS_TOKEN   the business public token (businesses.qr_code).
 *                             When empty, the site runs in static preview mode
 *                             (hardcoded vacancies, no network applications).
 *
 * CORS is open on the platform side for /api/v1/public/* from any origin.
 */

export interface LiveJobSite {
  id: number;
  name: string | null;
}

export interface LiveJobOpening {
  id: number;
  title: string;
  description: string | null;
  site_ids: number[];
  sites?: LiveJobSite[];
  opens_at: string | null;
  closes_at: string | null;
  positions_available: number | null;
  open_positions: number | null;
  apply_url: string;
}

export interface LiveFeed {
  business: { name: string; logo: string | null };
  jobs: LiveJobOpening[];
}

export interface ApplicationInput {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  cv?: File | null;
}

export interface ApplicationResult {
  id: number;
  name: string;
  stage: string;
}

import { useEffect, useState } from 'react';

/**
 * Shared live-feed state for job pages. In static preview mode (no token)
 * it resolves immediately with a null feed and the pages fall back to the
 * bundled featured vacancies.
 */
export function useLiveJobs() {
  const [feed, setFeed] = useState<LiveFeed | null>(null);
  const [loading, setLoading] = useState<boolean>(isLiveMode());
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!isLiveMode()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const ctrl = new AbortController();
    fetchOpenings(ctrl.signal)
      .then((f) => {
        setFeed(f);
        setLoading(false);
      })
      .catch((err) => {
        if ((err as Error)?.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
    return () => ctrl.abort();
  }, [attempt]);

  return { feed, loading, error, liveMode: isLiveMode(), retry: () => setAttempt((n) => n + 1) };
}

/**
 * Route id helpers. Live openings are addressed as `live-{numericId}`
 * (e.g. /vaga/live-2); static featured entries keep their slug ids.
 * This keeps one URL scheme for both data sources.
 */
export function toRouteId(job: LiveJobOpening): string {
  return `live-${job.id}`;
}

export function parseRouteId(routeId: string): { liveId: number } | { slug: string } {
  const m = /^live-(\d+)$/.exec(routeId || '');
  return m ? { liveId: Number(m[1]) } : { slug: routeId };
}

export interface LeadInput {
  company_name: string;
  contact_person: string;
  email: string;
  phone?: string;
  sector?: string;
  headcount?: string;
  message?: string;
}

/**
 * POST /public/contact — B2B/turnkey proposal request. Emailed to the
 * hiring business; always 201 for accepted payloads (delivery is
 * best-effort server-side, logged for follow-up).
 */
export async function submitLead(input: LeadInput, signal?: AbortSignal): Promise<void> {
  const token = getBusinessToken();
  if (!token) throw new JobsApiError(0, 'Lead intake not configured.');
  const res = await fetch(`${getApiBase()}/public/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ business: token, ...input }),
    signal,
  });
  if (res.status === 201) return;
  throw await readError(res);
}

export class JobsApiError extends Error {
  status: number;
  fields: Record<string, string[]>;

  constructor(status: number, message: string, fields: Record<string, string[]> = {}) {
    super(message);
    this.name = 'JobsApiError';
    this.status = status;
    this.fields = fields;
  }
}

export function getApiBase(): string {
  const raw = (import.meta.env.VITE_CHEGATTA_API_URL as string | undefined)?.trim();
  return (raw || 'https://app.chegatta.com/api/v1').replace(/\/+$/, '');
}

export function getBusinessToken(): string {
  return ((import.meta.env.VITE_EQX_BUSINESS_TOKEN as string | undefined) || '').trim();
}

/** True when live integration is configured (token present). */
export function isLiveMode(): boolean {
  return getBusinessToken().length > 0;
}

async function readError(res: Response): Promise<JobsApiError> {
  let message = `Request failed (${res.status}).`;
  let fields: Record<string, string[]> = {};
  try {
    const body = await res.json();
    if (typeof body?.message === 'string' && body.message) message = body.message;
    else if (typeof body?.error === 'string' && body.error) message = body.error;
    if (body?.errors && typeof body.errors === 'object') fields = body.errors;
  } catch {
    // Non-JSON error body: keep the generic message.
  }
  if (res.status === 429) {
    message = 'Too many attempts. Please wait a minute and try again.';
  }
  return new JobsApiError(res.status, message, fields);
}

/**
 * GET /public/jobs?business={token} — live openings for the business.
 * Returns only status=open, public, in-window postings.
 */
export async function fetchOpenings(signal?: AbortSignal): Promise<LiveFeed> {
  const token = getBusinessToken();
  if (!token) throw new JobsApiError(0, 'Live jobs not configured.');
  const res = await fetch(
    `${getApiBase()}/public/jobs?business=${encodeURIComponent(token)}`,
    { signal }
  );
  if (!res.ok) throw await readError(res);
  const body = await res.json();
  return {
    business: body.business || { name: '', logo: null },
    jobs: Array.isArray(body.jobs) ? body.jobs : [],
  };
}

/**
 * POST {apply_url} — submit a real application (creates a JobApplication
 * row in the business hiring pipeline). CV goes multipart; text-only goes
 * JSON. Throws JobsApiError on 422/429/network failure.
 */
export async function submitApplication(
  job: LiveJobOpening,
  input: ApplicationInput,
  signal?: AbortSignal
): Promise<ApplicationResult> {
  const hasCv = input.cv instanceof File;
  let res: Response;
  if (hasCv) {
    const form = new FormData();
    form.append('name', input.name);
    form.append('email', input.email);
    if (input.phone) form.append('phone', input.phone);
    if (input.notes) form.append('notes', input.notes);
    form.append('cv', input.cv as File);
    res = await fetch(job.apply_url, { method: 'POST', body: form, signal });
  } else {
    res = await fetch(job.apply_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        phone: input.phone || undefined,
        notes: input.notes || undefined,
      }),
      signal,
    });
  }
  if (res.status === 201) {
    const body = await res.json();
    return body.application as ApplicationResult;
  }
  throw await readError(res);
}
