import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authenticateUser } from '@/lib/authClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [needs2FA, setNeeds2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const sessionData = await authenticateUser(
        email,
        password,
        needs2FA ? twoFactorCode : undefined
      );

      // Transform the response to match our Session interface
      const session = {
        token: sessionData.token,
        expires: sessionData.expires,
        refresh_token: '', // Not provided in the response, but we can keep it empty
        user: sessionData.user,
        zendesk_token: sessionData.zendesk_token,
        b2c_token: sessionData.b2c_token,
      };

      login(session);
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';

      if (errorMessage.includes('NEED_2FA')) {
        setNeeds2FA(true);
        setError('Please enter your 2FA code');
      } else if (errorMessage.includes('2FA_WRONG')) {
        setError('Invalid 2FA code. Please try again.');
      } else if (errorMessage.includes('INVALID')) {
        setError('Invalid email or password');
      } else if (errorMessage.includes('NOT_ALLOWED')) {
        setError('You are not authorized to access this system');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant border-gray-200">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex justify-center">
            <img
              src="/logo-complete.svg"
              alt="Nivoda"
              className="h-8"
            />
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-xl font-semibold text-foreground">Jewelry CMS</CardTitle>
            <CardDescription className="text-sm">
              {needs2FA ? 'Enter your 2FA code' : 'Sign in to your manufacturer account'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!needs2FA ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="current-password"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="2fa">Two-Factor Authentication Code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={twoFactorCode}
                      onChange={setTwoFactorCode}
                      disabled={loading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setNeeds2FA(false);
                    setTwoFactorCode('');
                    setError('');
                  }}
                  disabled={loading}
                >
                  Back to login
                </Button>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : needs2FA ? (
                'Verify & Sign In'
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
