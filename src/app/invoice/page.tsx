'use client';
import Invoice from '@/components/invoice/invoice';
import { PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

const InvoicePage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <PDFViewer width="1450" height="850" className="app">
          <Invoice data={{}} />
        </PDFViewer>
      )}
    </div>
  );
};

export default InvoicePage;
