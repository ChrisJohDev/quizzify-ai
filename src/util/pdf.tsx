import { jsPDF } from "jspdf";
import { Question } from '@/util/types';

const createPdf = (json: Question[], fileName: string, subject: string) => {
  const questions = json.map((question) => question.question);
  const answers = json.map((question) => question.answer);
  const pageWidth = 210;
  const lineHeight = 20;
  const margin = 20;
  const maxLineWidth = pageWidth - margin * 2;
  const fontSize = 16;
  const ptsPerMillimeter = 25.4;
  const oneLineHeight = (fontSize * lineHeight) / ptsPerMillimeter;

  subject = subject === '' ? 'General knowledge' : subject;

  const file = fileName === '' ? 'quiz.pdf' : fileName + '.pdf';
  const doc = new jsPDF();
  
  const headline = doc.setFont('serif', 'bold').setFontSize(fontSize * 2).splitTextToSize(`Your quiz on the subject of ${subject}`, maxLineWidth);
  doc.text(headline, 105, oneLineHeight, { align: 'center' });
  let lineAdjust= 3;
  doc.setFont('helvetica', 'normal').setFontSize(fontSize).text('Questions:', 10, (oneLineHeight * 3))
  for (let i = 0; i < questions.length; i++) {
    const numb = i + 1;
    const text = doc.splitTextToSize(numb +') ' + questions[i]+'\n', maxLineWidth);
    doc.text(text, 10, oneLineHeight+ (oneLineHeight * (i + lineAdjust)));

    if (text.length > 2) {
      lineAdjust++;
      text[1] = '.   ' + text[1];
    }
    // console.log('\n*** [createPdf] text:', text, '\ni:', i, '\nlineAdjust:', lineAdjust);
  }
  doc.setFont('helvetica', 'normal').setFontSize(fontSize * 0.6).text([`A quiz by Quizzify-AI`, 'www.quizzify-ai.com'], 105, oneLineHeight * (questions.length + lineAdjust + 3), { align: 'center' });
  doc.addPage();
  doc.setFont('helvetica', 'normal').setFontSize(fontSize).text(`Answers: on ${subject}`, 30, (oneLineHeight))
  for (let i = 0; i < answers.length; i++) {
    doc.text(`${i + 1}) ` + answers[i], 30, 2 * oneLineHeight + (i * 10));
  }
  doc.setFont('helvetica', 'normal').setFontSize(fontSize * 0.6).text([`A quiz by Quizzify-AI`, 'www.quizzify-ai.com'], 105, oneLineHeight * (questions.length + lineAdjust + 3), { align: 'center' });
  doc.save(file);
}

export default createPdf;