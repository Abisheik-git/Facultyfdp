import { useState, useEffect } from 'react';
import { Search, FileSpreadsheet, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { hodAPI } from '@/lib/api';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const HODFaculty = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      setLoading(true);
      const data = await hodAPI.getFaculty();
      setFaculty(data || []);
    } catch (error) {
      console.error('Failed to load faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = faculty.filter((fac: any) =>
    fac.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fac.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fac.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      faculty.map((fac: any) => ({
        'Faculty ID': fac._id || fac.id,
        'Name': fac.name,
        'Email': fac.email,
        'Department': fac.department,
        'Designation': fac.designation || 'Faculty',
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Faculty Profiles');
    XLSX.writeFile(workbook, `${user?.department}_Faculty_Profiles.xlsx`);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`${user?.department} Department - Faculty Profiles`, 14, 20);
    
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Name', 'Email', 'Designation', 'Department']],
      body: faculty.map((fac: any) => [
        (fac._id || fac.id).toString().substring(0, 8),
        fac.name,
        fac.email,
        fac.designation || 'Faculty',
        fac.department,
      ]),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });

    doc.save(`${user?.department}_Faculty_Profiles.pdf`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Department Faculty</h1>
        <p className="text-muted-foreground">Manage and view faculty in {user?.department}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Faculty Members</CardTitle>
              <CardDescription>Total: {faculty.length} faculty members</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={downloadExcel} variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              <Button onClick={downloadPDF} variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>FDPs</TableHead>
                  <TableHead>Seminars</TableHead>
                  <TableHead>Workshops</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredFaculty.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No faculty found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFaculty.map((fac: any) => (
                    <TableRow key={fac._id || fac.id}>
                      <TableCell className="font-medium">
                        {(fac._id || fac.id).toString().substring(0, 8)}
                      </TableCell>
                      <TableCell>{fac.name}</TableCell>
                      <TableCell>{fac.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{fac.designation || 'Faculty'}</Badge>
                      </TableCell>
                      <TableCell>{fac.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline">-</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">-</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">-</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HODFaculty;

