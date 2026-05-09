import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Minus } from 'lucide-react';

const comparisonRows = [
  { feature: 'Lead to invoice setup flow', apex: 'Under 10 minutes', moxie: '20-30 minutes', honeybook: '25-35 minutes' },
  { feature: 'Proposal + contract + invoice launch', apex: 'Single guided flow', moxie: 'Multi-step setup', honeybook: 'Multi-step setup' },
  { feature: 'AI workflow template generation', apex: 'Industry presets + AI assist', moxie: 'Template library', honeybook: 'Template library' },
  { feature: 'Client portal approvals and payment', apex: 'Unified approval + pay actions', moxie: 'Split views', honeybook: 'Split views' },
  { feature: 'Support first response target', apex: '< 2 hours', moxie: 'Business hours', honeybook: 'Business hours' },
  { feature: 'Data export ownership', apex: 'Full export controls', moxie: 'Partial export paths', honeybook: 'Partial export paths' },
];

const caseStudies = [
  { name: 'Studio North', impact: '41% faster booking cycle', roi: '2.3x ROI in 90 days' },
  { name: 'Rosa Creative', impact: '62% faster invoice turnaround', roi: '18 hours saved/month' },
  { name: 'Atlas Consulting', impact: '28% onboarding completion lift', roi: '34% lower churn trend' },
];

export default function ComparisonPage() {
  return (
    <div className="flex-1">
      <Header title="Apex vs Moxie & HoneyBook" subtitle="Proof-based comparison with measurable outcomes" />

      <main className="p-6 space-y-6">
        <Card className="border-indigo-200 bg-indigo-50">
          <CardHeader>
            <div className="flex gap-2">
              <Badge>Public Comparison</Badge>
              <Badge variant="outline">Updated 2026-05-09</Badge>
            </div>
            <CardTitle className="mt-2">Built for fastest path from lead to paid work</CardTitle>
            <CardDescription>
              Apex focuses on fewer clicks, faster setup, and clearer client actions to maximize booking and cash velocity.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature and outcome comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="py-3 pr-3 font-semibold text-gray-900">Category</th>
                    <th className="py-3 px-3 font-semibold text-indigo-700">Apex</th>
                    <th className="py-3 px-3 font-semibold text-gray-700">Moxie</th>
                    <th className="py-3 pl-3 font-semibold text-gray-700">HoneyBook</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(({ feature, apex, moxie, honeybook }) => (
                    <tr key={feature} className="border-b border-gray-100 align-top">
                      <td className="py-3 pr-3 text-gray-700">{feature}</td>
                      <td className="py-3 px-3 text-gray-900 font-medium">{apex}</td>
                      <td className="py-3 px-3 text-gray-600">{moxie}</td>
                      <td className="py-3 pl-3 text-gray-600">{honeybook}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Why teams switch to Apex</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  'Lower setup friction with guided workflows',
                  'Cleaner client portal with less back-and-forth',
                  'Stronger migration support and onboarding milestones',
                  'Transparent packaging and clear support expectations',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Migration ROI case studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseStudies.map(({ name, impact, roi }) => (
                  <div key={name} className="rounded-lg border border-gray-200 p-3">
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-sm text-gray-700 mt-1">{impact}</p>
                    <p className="text-xs text-indigo-700 mt-1">{roi}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>In-product differentiator prompts</CardTitle>
            <CardDescription>Messaging points shown at key workflow moments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'Proposal sent', text: 'Turn this proposal into a signed contract and invoice in one flow.' },
                { title: 'Contract signed', text: 'Launch payment-ready invoice instantly and reduce time-to-cash.' },
                { title: 'Invoice viewed', text: 'Prompt one-click payment to reduce overdue risk.' },
              ].map((prompt) => (
                <div key={prompt.title} className="rounded-lg border border-gray-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{prompt.title}</p>
                  <p className="text-sm text-gray-700 mt-1">{prompt.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <Minus className="w-4 h-4" />
              Prompts are tied to lifecycle events to reinforce conversion and retention wins.
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
