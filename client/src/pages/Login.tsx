import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap } from 'lucide-react';
import { authAPI } from '@/lib/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'faculty' | 'hod' | ''>('');
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isSignup) {
      if (!email || !password || !role) {
        setError('Please fill in all fields');
        return;
      }

      try {
        const success = await login(email, password, role as 'admin' | 'faculty' | 'hod');

        if (success) {
          if (role === 'admin') {
            navigate('/admin');
          } else if (role === 'hod') {
            navigate('/hod');
          } else {
            navigate('/faculty');
          }
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } catch (error) {
        setError('Login failed. Please try again.');
        console.error('Login error:', error);
      }
      return;
    }

    if (!name || !phone || !email || !password || !recoveryEmail) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await authAPI.register({
        name,
        email,
        password,
        role: 'faculty',
        department: '',
        designation: '',
        phone,
        recoveryEmail,
      });
      const success = await login(email, password, 'faculty');
      if (success) {
        navigate('/faculty');
      }
    } catch (err) {
      setError('Sign up failed. Please try again.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{isSignup ? 'Create Account' : 'Welcome Back'}</CardTitle>
          <CardDescription>
            {isSignup ? 'Sign up to access your faculty portfolio' : 'Sign in to access your faculty portfolio'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="recoveryEmail">Recovery Email</Label>
                <Input
                  id="recoveryEmail"
                  type="email"
                  placeholder="Enter your recovery email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            {!isSignup && (
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'faculty' | 'hod')}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="hod">Head of Department (HOD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" size="lg">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => {
                setError('');
                setIsSignup((v) => !v);
              }}
            >
              {isSignup ? 'Already have an account? Sign in' : 'New user? Create an account'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
