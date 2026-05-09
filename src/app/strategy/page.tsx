import Link from 'next/link';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Flag, LineChart, Sparkles, ShieldCheck, ArrowRight, CalendarCheck2 } from 'lucide-react';

const benchmarkTargets = [
  { metric: 'Time-to-invoice', baseline: '43 min', target: '10 min', progress: 38 },
  { metric: 'Booking conversion', baseline: '24%', target: '35%', progress: 61 },
  { metric: 'Onboarding completion', baseline: '58%', target: '80%', progress: 47 },
  { metric: 'Monthly churn', baseline: '5.8%', target: '<3.5%', progress: 54 },
  { metric: 'NPS', baseline: '28', target: '50', progress: 42 },
  { metric: 'Mobile performance (LCP)', baseline: '3.7s', target: '<2.0s', progress: 49 },
  { metric: 'Support first response', baseline: '14h', target: '<2h', progress: 33 },
];

const workflowGaps = [
  'Lead capture lacks one-tap conversion into proposal drafts.',
  'Proposal → contract handoff has too much duplicate data entry.',
  'Invoice + payment setup requires too many manual edits per client.',
  'Project delivery updates are not consistently visible in the client portal.',
];

const uxFriction = [
  'Automation setup requires too much configuration for new users.',
  'Onboarding does not create a first “money moment” quickly enough.',
  'Client approval and payment actions should be one-screen experiences.',
];

const mustWinFeatures = [
  'One-flow deal launch: proposal, contract, and invoice in under 5 clicks.',
  'AI-assisted workflow templates by business type and service model.',
  'Unified client portal for approvals, status, files, and payment actions.',
  'Web + mobile speed and reliability targets with weekly regression checks.',
];

const onboardingMigration = [
  '10-minute guided setup with progress milestones and quick wins.',
  'Import from competitor exports into clients, projects, invoices, and contracts.',
  'Industry-specific presets (creative, coaching, consulting, studio).',
];

const trustAdvantages = [
  'Transparent pricing and plan limits shown before checkout.',
  'Support SLA targets with in-app escalation and real-time status.',
  'Clear data export ownership policy and security trust center visibility.',
];

const productLoop = [
  'Ship smallest high-impact improvements every week.',
  'Benchmark metrics against Moxie and HoneyBook every sprint.',
  'Interview churned users and recent switchers each week.',
  'Re-rank roadmap based on conversion and retention impact.',
];

const proofAssets = [
  'Public comparison page with measurable claims and source dates.',
  'Migration case studies with time saved, booking lift, and ROI.',
  'In-product prompts at proposal, contract, and invoice milestones.',
];

export default function StrategyPage() {
  return (
    <div className="flex-1">
      <Header title="Growth Strategy" subtitle="Operational plan to outperform Moxie and HoneyBook" />

      <main className="p-6 space-y-6">
        <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge>Positioning Wedge</Badge>
              <Badge variant="outline">Fastest solo-business ops platform</Badge>
            </div>
            <CardTitle className="mt-2">Win on speed-to-cash and client clarity</CardTitle>
            <CardDescription>
              Every roadmap decision must reduce setup time, clicks, and delay between lead capture and payment.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LineChart className="w-5 h-5 text-indigo-600" /> Better = measurable targets</CardTitle>
            <CardDescription>Benchmarks tracked against competitors and reviewed weekly.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {benchmarkTargets.map(({ metric, baseline, target, progress }) => (
                <div key={metric} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium text-gray-900">{metric}</span>
                    <span className="text-gray-500">Baseline {baseline} → Target {target}</span>
                  </div>
                  <Progress value={progress} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Flag className="w-5 h-5 text-indigo-600" /> Competitive gap audit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Core workflow gaps</p>
                <ul className="space-y-2">
                  {workflowGaps.map((gap) => (
                    <li key={gap} className="text-sm text-gray-600 flex gap-2"><span className="text-indigo-600 mt-0.5">•</span><span>{gap}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Pricing and packaging</p>
                <p className="text-sm text-gray-600">Expose value by feature tier with no hidden add-on costs for essential workflows.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">UX friction points</p>
                <ul className="space-y-2">
                  {uxFriction.map((gap) => (
                    <li key={gap} className="text-sm text-gray-600 flex gap-2"><span className="text-indigo-600 mt-0.5">•</span><span>{gap}</span></li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-600" /> Must-win product priorities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mustWinFeatures.map((item) => (
                  <li key={item} className="text-sm text-gray-700 flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Onboarding & migration</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {onboardingMigration.map((item) => (
                  <li key={item} className="text-sm text-gray-700 flex gap-2"><span className="text-indigo-600 mt-0.5">•</span><span>{item}</span></li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-600" /> Trust advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {trustAdvantages.map((item) => (
                  <li key={item} className="text-sm text-gray-700 flex gap-2"><span className="text-indigo-600 mt-0.5">•</span><span>{item}</span></li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><CalendarCheck2 className="w-4 h-4 text-indigo-600" /> Weekly product loop</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {productLoop.map((item) => (
                  <li key={item} className="text-sm text-gray-700 flex gap-2"><span className="text-indigo-600 mt-0.5">•</span><span>{item}</span></li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Proof-based positioning rollout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {proofAssets.map((item) => (
                <li key={item} className="text-sm text-gray-700 flex gap-2"><span className="text-indigo-600 mt-0.5">•</span><span>{item}</span></li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Open public comparison page <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Review in-product prompts
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
