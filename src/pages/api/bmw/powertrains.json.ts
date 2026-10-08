import type { APIRoute } from 'astro';
import { BMW_POWERTRAINS } from '../../../data/powertrains';

export const GET: APIRoute = async ({ url }) => {
  const chassis = url.searchParams.get('chassis')?.toUpperCase();
  const engine = url.searchParams.get('engine')?.toUpperCase();
  const badge = url.searchParams.get('badge')?.toLowerCase();
  const phase = url.searchParams.get('phase')?.toLowerCase();

  let results = BMW_POWERTRAINS;

  if (chassis) {
    results = results.filter(m => m.chassisCode.toUpperCase() === chassis);
  }

  if (badge) {
    results = results.map(m => ({
      ...m,
      engines: m.engines.filter(e => e.modelBadge.toLowerCase().includes(badge))
    })).filter(m => m.engines.length > 0);
  }

  if (engine) {
    results = results.map(m => ({
      ...m,
      engines: m.engines.filter(e => e.engineCode.toUpperCase().includes(engine))
    })).filter(m => m.engines.length > 0);
  }

  if (phase) {
    results = results.map(m => ({
      ...m,
      engines: m.engines.filter(e => e.phase.toLowerCase().includes(phase) || e.phase.includes('Ambas'))
    })).filter(m => m.engines.length > 0);
  }

  return new Response(JSON.stringify({
    brand: 'BMW',
    totalModels: results.length,
    filters: {
      chassis: chassis || null,
      engine: engine || null,
      badge: badge || null,
      phase: phase || null
    },
    data: results
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
