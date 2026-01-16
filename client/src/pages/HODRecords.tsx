import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { hodAPI } from '@/lib/api';

const HODRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<{
    fdpAttended: any[];
    fdpOrganized: any[];
    seminars: any[];
    abl: any[];
    jointTeaching: any[];
    adjunct: any[];
  }>({
    fdpAttended: [],
    fdpOrganized: [],
    seminars: [],
    abl: [],
    jointTeaching: [],
    adjunct: [],
  });
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const [recordsData, facultyData] = await Promise.all([
        hodAPI.getRecords(),
        hodAPI.getFaculty(),
      ]);
      setRecords(recordsData);
      setFaculty(facultyData || []);
    } catch (error) {
      console.error('Failed to load records:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFacultyName = (facultyId: any) => {
    if (typeof facultyId === 'object' && facultyId?.name) {
      return facultyId.name;
    }
    const fac = faculty.find((f: any) => (f._id || f.id) === facultyId);
    return fac?.name || 'Unknown';
  };

  const allFDPs = [...records.fdpAttended, ...records.fdpOrganized];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Department Records</h1>
        <p className="text-muted-foreground">View all records from {user?.department} department</p>
      </div>

      <Tabs defaultValue="fdps" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fdps">FDPs</TabsTrigger>
          <TabsTrigger value="seminars">Seminars</TabsTrigger>
        </TabsList>

        <TabsContent value="fdps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>FDP Records</CardTitle>
              <CardDescription>Total: {allFDPs.length} FDPs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Venue/Mode</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : allFDPs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No FDP records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      allFDPs.map((fdp: any) => (
                        <TableRow key={fdp._id || fdp.id}>
                          <TableCell className="font-medium">
                            {getFacultyName(fdp.facultyId)}
                          </TableCell>
                          <TableCell>{fdp.title}</TableCell>
                          <TableCell>{fdp.venue || fdp.mode || 'N/A'}</TableCell>
                          <TableCell>{fdp.duration || 'N/A'}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                fdp.status === 'approved'
                                  ? 'default'
                                  : fdp.status === 'pending'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                            >
                              {fdp.status || 'pending'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seminars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seminar Records</CardTitle>
              <CardDescription>Total: {records.seminars.length} seminars</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Attendees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : records.seminars.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          No seminar records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      records.seminars.map((seminar: any) => (
                        <TableRow key={seminar._id || seminar.id}>
                          <TableCell className="font-medium">
                            {getFacultyName(seminar.facultyId)}
                          </TableCell>
                          <TableCell>{seminar.title}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{seminar.topic || 'N/A'}</Badge>
                          </TableCell>
                          <TableCell>
                            {seminar.date ? new Date(seminar.date).toLocaleDateString() : 'N/A'}
                          </TableCell>
                          <TableCell>{seminar.venue}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{seminar.attendees || 0}</Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HODRecords;

