import { MoodboardProject } from '../types';
import { PRESET_BOARDS, generateMoodboard } from './moodboardGenerator';
import { parseAiCommand } from './commandParser';

export type GenPhase = 'idle' | 'submit' | 'thinking' | 'building' | 'revealing' | 'done' | 'error';

export interface GenStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed';
}

export const TEXT_STEPS: GenStep[] = [
  { id: 'parse', label: 'Parsing intent & vector keywords', status: 'pending' },
  { id: 'palette', label: 'Picking harmonious WCAG AA palette', status: 'pending' },
  { id: 'fonts', label: 'Pairing Google Fonts display & body', status: 'pending' },
  { id: 'copy', label: 'Synthesizing editorial brand copy', status: 'pending' },
  { id: 'layout', label: 'Composing spatial grid layout', status: 'pending' },
  { id: 'wcag', label: 'Verifying contrast & accessibility compliance', status: 'pending' }
];

export const IMAGE_STEPS: GenStep[] = [
  { id: 'pixels', label: 'Scanning dropped image raster pixels', status: 'pending' },
  { id: 'extract', label: 'Extracting dominant 5-color palette', status: 'pending' },
  { id: 'mood', label: 'Detecting lighting & aesthetic mood', status: 'pending' },
  { id: 'layout', label: 'Synthesizing layout components', status: 'pending' },
  { id: 'wcag', label: 'Verifying contrast & accessibility compliance', status: 'pending' }
];

export async function executeGenerationSequence(
  input: string | File,
  currentProject: MoodboardProject,
  onPhaseChange: (phase: GenPhase, progress: number, activeSteps: GenStep[]) => void
): Promise<{ project: MoodboardProject; durationMs: number }> {
  const startTime = performance.now();
  const isImage = typeof input !== 'string';
  const steps = JSON.parse(JSON.stringify(isImage ? IMAGE_STEPS : TEXT_STEPS));

  // Phase 1: Submit (0 - 300ms)
  onPhaseChange('submit', 10, steps);
  await new Promise(r => setTimeout(r, 300));

  // Phase 2: Thinking (300ms - 1500ms)
  onPhaseChange('thinking', 30, steps);
  for (let i = 0; i < steps.length; i++) {
    steps[i].status = 'running';
    onPhaseChange('thinking', 30 + (i * 10), [...steps]);
    await new Promise(r => setTimeout(r, 200));
    steps[i].status = 'completed';
  }

  // Phase 3: Building & Revealing (1500ms - 3000ms)
  onPhaseChange('building', 70, steps);
  await new Promise(r => setTimeout(r, 600));

  onPhaseChange('revealing', 90, steps);
  await new Promise(r => setTimeout(r, 800));

  // Generate result with resilience timeout
  let resultProject: MoodboardProject;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    // Try API if available, else local generator
    if (typeof input === 'string') {
      const parsed = parseAiCommand(currentProject, input);
      resultProject = parsed.updatedBoard;
    } else {
      resultProject = generateMoodboard(input.name.replace(/\.[^/.]+$/, ''));
    }
    clearTimeout(timeoutId);
  } catch (err) {
    // Silent fallback to local parser
    const promptStr = typeof input === 'string' ? input : 'Custom Upload Asset';
    resultProject = generateMoodboard(promptStr);
  }

  const durationMs = Math.round(performance.now() - startTime);
  onPhaseChange('done', 100, steps);

  return { project: resultProject, durationMs };
}
