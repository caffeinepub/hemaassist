import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateFBCReport } from '@/lib/fbcReport';
import { validateFBCInputs } from '@/lib/fbcValidation';
import { Copy, RotateCcw, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

interface FBCInputs {
  patientName: string;
  patientId: string;
  hb: string;
  rbc: string;
  wbc: string;
  platelets: string;
  mcv: string;
  mchc: string;
  neutrophils: string;
  lymphocytes: string;
  monocytes: string;
  eosinophils: string;
  basophils: string;
}

function App() {
  const [inputs, setInputs] = useState<FBCInputs>({
    patientName: '',
    patientId: '',
    hb: '',
    rbc: '',
    wbc: '',
    platelets: '',
    mcv: '',
    mchc: '',
    neutrophils: '',
    lymphocytes: '',
    monocytes: '',
    eosinophils: '',
    basophils: '',
  });

  const [report, setReport] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (field: keyof FBCInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleGenerate = () => {
    const validationError = validateFBCInputs(inputs);
    if (validationError) {
      setError(validationError);
      return;
    }

    const generatedReport = generateFBCReport(inputs);
    setReport(generatedReport);
    setError('');
    toast.success('FBC comment generated successfully');
  };

  const handleClear = () => {
    setInputs({
      patientName: '',
      patientId: '',
      hb: '',
      rbc: '',
      wbc: '',
      platelets: '',
      mcv: '',
      mchc: '',
      neutrophils: '',
      lymphocytes: '',
      monocytes: '',
      eosinophils: '',
      basophils: '',
    });
    setReport('');
    setError('');
    toast.info('All fields cleared');
  };

  const handleCopyToClipboard = async () => {
    if (!report) {
      toast.error('No report to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(report);
      toast.success('Report copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <img 
              src="/assets/generated/hemaassist-logo.dim_512x512.png" 
              alt="HemaAssist Logo" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                HemaAssist
              </h1>
              <p className="text-sm text-muted-foreground">
                Full Blood Count Auto Comment Generator
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Input Forms */}
          <div className="space-y-6">
            {/* Patient Details */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Patient Details</CardTitle>
                <CardDescription>Enter patient identification information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      placeholder="Enter patient name"
                      value={inputs.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input
                      id="patientId"
                      placeholder="Enter patient ID"
                      value={inputs.patientId}
                      onChange={(e) => handleInputChange('patientId', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FBC Results */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">FBC Results</CardTitle>
                <CardDescription>Enter all numeric values from the full blood count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="hb">Hemoglobin (Hb)</Label>
                    <Input
                      id="hb"
                      type="number"
                      step="0.1"
                      placeholder="g/dL"
                      value={inputs.hb}
                      onChange={(e) => handleInputChange('hb', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rbc">RBC Count</Label>
                    <Input
                      id="rbc"
                      type="number"
                      step="0.01"
                      placeholder="×10¹²/L"
                      value={inputs.rbc}
                      onChange={(e) => handleInputChange('rbc', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wbc">WBC Count</Label>
                    <Input
                      id="wbc"
                      type="number"
                      step="0.1"
                      placeholder="×10⁹/L"
                      value={inputs.wbc}
                      onChange={(e) => handleInputChange('wbc', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platelets">Platelets</Label>
                    <Input
                      id="platelets"
                      type="number"
                      placeholder="×10⁹/L"
                      value={inputs.platelets}
                      onChange={(e) => handleInputChange('platelets', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mcv">MCV</Label>
                    <Input
                      id="mcv"
                      type="number"
                      step="0.1"
                      placeholder="fL"
                      value={inputs.mcv}
                      onChange={(e) => handleInputChange('mcv', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mchc">MCHC</Label>
                    <Input
                      id="mchc"
                      type="number"
                      step="0.1"
                      placeholder="g/dL"
                      value={inputs.mchc}
                      onChange={(e) => handleInputChange('mchc', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="neutrophils">Neutrophils</Label>
                    <Input
                      id="neutrophils"
                      type="number"
                      step="0.1"
                      placeholder="%"
                      value={inputs.neutrophils}
                      onChange={(e) => handleInputChange('neutrophils', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lymphocytes">Lymphocytes</Label>
                    <Input
                      id="lymphocytes"
                      type="number"
                      step="0.1"
                      placeholder="%"
                      value={inputs.lymphocytes}
                      onChange={(e) => handleInputChange('lymphocytes', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monocytes">Monocytes</Label>
                    <Input
                      id="monocytes"
                      type="number"
                      step="0.1"
                      placeholder="%"
                      value={inputs.monocytes}
                      onChange={(e) => handleInputChange('monocytes', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eosinophils">Eosinophils</Label>
                    <Input
                      id="eosinophils"
                      type="number"
                      step="0.1"
                      placeholder="%"
                      value={inputs.eosinophils}
                      onChange={(e) => handleInputChange('eosinophils', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="basophils">Basophils</Label>
                    <Input
                      id="basophils"
                      type="number"
                      step="0.1"
                      placeholder="%"
                      value={inputs.basophils}
                      onChange={(e) => handleInputChange('basophils', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleGenerate} size="lg" className="flex-1 min-w-[200px]">
                <FileText className="mr-2 h-4 w-4" />
                Generate FBC Comment
              </Button>
              <Button onClick={handleClear} variant="outline" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Report Output */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Generated Report</CardTitle>
                    <CardDescription>Auto-generated FBC interpretation</CardDescription>
                  </div>
                  {report && (
                    <Button onClick={handleCopyToClipboard} variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={report}
                  readOnly
                  placeholder="Generated report will appear here after clicking 'Generate FBC Comment'..."
                  className="min-h-[400px] font-mono text-sm resize-none"
                />
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Alert className="border-muted-foreground/20 bg-muted/30">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <AlertDescription className="text-xs text-muted-foreground">
                For laboratory assistance only. Final interpretation must be done by a qualified practitioner.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16 py-6 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} HemaAssist. Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'hemaassist'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
