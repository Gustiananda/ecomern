import fs from 'fs';
import PDFDocumentTable from 'pdfkit-table';

export const generatePDFReport = async (order, path) => {
  // init document
  let doc = new PDFDocumentTable({
    size: 'A2',
    margin: 20,
    layout: 'landscape',
  });

  // save document
  doc.pipe(fs.createWriteStream(path));

  // let rows = [];
  // laporan.forEach((lap, i) => {
  //   rows.push([
  //     i + 1,
  //     lap.nomorPendaftaran,
  //     lap.nama,
  //     parseFloat(lap.nilai).toFixed(2),
  //     lap.nilai > 4 ? 'Lulus' : 'Tidak lulus',
  //   ]);
  // });
  console.log('order', order)
  const table = {
    title: 'LAPORAN STATISTIK',
    subtitle: '',
    headers: ['No', 'Hari', 'Tanggal', 'Nama', 'Barang', 'Jumlah', 'Harga', 'Alamat', 'Status'],
    rows: order,
  };
  // the magic
  await doc.table(table, {
    columnsSize: [50, 100, 150, 300, 350, 50, 200, 350, 100],
    prepareHeader: () => doc.font('Helvetica-Bold').fontSize(8),
    prepareRow: (
      row,
      indexColumn,
      indexRow,
      rectRow,
      rectCell
    ) => {
      doc.font('Helvetica').fontSize(8);
      indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
    },
  });
  doc.end();
};
