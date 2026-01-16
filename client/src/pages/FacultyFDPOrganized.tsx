import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FDPOrganized } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { facultyAPI } from '@/lib/api';

const FacultyFDPOrganized = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [records, setRecords] = useState<FDPOrganized[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FDPOrganized | null>(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await facultyAPI.getFDPOrganized();
      setRecords(data.map((item: any) => ({
        id: item._id || item.id,
        facultyId: item.facultyId?._id || item.facultyId || user?.id || '',
        title: item.title,
        venue: item.venue,
        type: item.type,
        proofDoc: item.proofDoc,
        report: item.report,
        status: item.status || 'pending',
      })));
    } catch (error) {
      console.error('Failed to load records:', error);
      toast({ title: 'Failed to load records', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      title: formData.get('title') as string,
      venue: formData.get('venue') as string,
      type: formData.get('type') as 'conference' | 'workshop',
    };

    try {
      if (editingRecord) {
        await facultyAPI.updateFDPOrganized(editingRecord.id, data);
        toast({ title: 'FDP updated successfully' });
      } else {
        await facultyAPI.createFDPOrganized(data);
        toast({ title: 'FDP added successfully' });
      }
      await loadRecords();
      setIsDialogOpen(false);
      setEditingRecord(null);
    } catch (error) {
      console.error('Failed to save FDP:', error);
      toast({ title: 'Failed to save FDP', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FDP?')) return;
    try {
      await facultyAPI.deleteFDPOrganized(id);
      toast({ title: 'FDP deleted successfully', variant: 'destructive' });
      await loadRecords();
    } catch (error) {
      console.error('Failed to delete FDP:', error);
      toast({ title: 'Failed to delete FDP', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organized FDPs</h1>
          <p className="text-muted-foreground">Manage FDPs you have organized</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRecord(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add FDP
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRecord ? 'Edit' : 'Add'} Organized FDP</DialogTitle>
              <DialogDescription>Fill in the details of the FDP you organized</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">FDP Title</Label>
                <Input id="title" name="title" defaultValue={editingRecord?.title} required />
              </div>
              <div>
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" name="venue" defaultValue={editingRecord?.venue} required />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select name="type" defaultValue={editingRecord?.type || 'workshop'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editingRecord ? 'Update' : 'Add'} FDP
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : records.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No FDP records found</div>
      ) : (
        <div className="grid gap-4">
          {records.map((fdp) => (
          <Card key={fdp.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{fdp.title}</CardTitle>
                  <CardDescription>{fdp.venue}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={fdp.status === 'approved' ? 'default' : 'secondary'}>
                    {fdp.status}
                  </Badge>
                  <Badge variant="outline">{fdp.type}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {fdp.proofDoc && (
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Proof Document
                    </div>
                  )}
                  {fdp.report && (
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      Report
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingRecord(fdp);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(fdp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyFDPOrganized;
