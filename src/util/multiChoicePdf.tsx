import { jsPDF } from "jspdf";
import { MultiChoiceQuestion, Question, MultiChoice } from '@/util/types';

const isDevelopment = process.env.NODE_ENV === 'development';

const createMultiChoicePdf = (qNa: Question[] | MultiChoiceQuestion[], fileName: string, subject: string) => {
  const questions = qNa.map((question) => question.question);
  const choices = qNa.map((question) => 'choices' in question ? question.choices : []);
  const answers = qNa.map((question) => question.answer.toLowerCase());
  const pageWidth = 210;
  const pageHeight = 297;
  const lineHeight = 20;
  const margin = 20;
  const marginHeight = 3;
  const maxLineWidth = pageWidth - margin * 2;
  const fontSize = 12;
  const ptsPerMillimeter = 25.4;
  const oneLineHeight = (fontSize * lineHeight) / ptsPerMillimeter;
  const maxLinesPerPage = Math.floor((pageHeight - marginHeight * 2 * oneLineHeight) / oneLineHeight);

  isDevelopment && console.log('\n*** [createPdf] questions:', questions, '\nchoices:', choices, '\nanswers:', answers, '\nfileName:', fileName, '\nsubject:', subject);

  subject = subject === '' ? 'General knowledge' : subject;

  const file = fileName === '' ? 'quiz.pdf' : fileName + '.pdf';
  const doc = new jsPDF();

  let lineAdjust = marginHeight;
  
  const headline = doc.setFont('serif', 'bold').setFontSize(fontSize * 2).splitTextToSize(`Your quiz on the subject of ${subject}`, maxLineWidth);
  doc.text(headline, 105, lineAdjust * oneLineHeight, { align: 'center' });

  lineAdjust += 2;
  
  doc.setFont('helvetica', 'bold, underline').setFontSize(fontSize).text('Questions:', 10, lineAdjust * oneLineHeight);

  lineAdjust++;
  
  for (let i = 0; i < questions.length; i++) {
    doc.setFont('helvetica', 'bold');
    const numb = i + 1;
    const text = doc.splitTextToSize(numb +') ' + questions[i]+'\n', maxLineWidth);
    doc.text(text, 10, (oneLineHeight * (i + lineAdjust)));

    if (text.length > 2) {
      lineAdjust++;
      text[1] = '.   ' + text[1];
    }
    doc.setFont('helvetica', 'normal');
    for(let j = 0; j < choices[i].length; j++){
      lineAdjust++;
      const choiceText = doc.splitTextToSize('    ' + MultiChoice[j] + ') ' + choices[i][j]+'\n', maxLineWidth);
      doc.text(choiceText, 10, (oneLineHeight * (i + lineAdjust)));
    }
    answers[i] = answers[i] + ') ' + choices[i][MultiChoice[answers[i] as keyof typeof MultiChoice]];
    // console.log('\n*** [createPdf] text:', text, '\ni:', i, '\nlineAdjust:', lineAdjust);
    if (lineAdjust + 5 > maxLinesPerPage) {
      doc.addPage();
      lineAdjust = marginHeight - i;
    }
  }

  doc.setFont('helvetica', 'normal').setFontSize(fontSize * 0.6).text([`A quiz by Quizzify-AI`, 'www.quizzify-ai.com'], 105, oneLineHeight * (questions.length + lineAdjust + 3), { align: 'center' });
  doc.addPage();
  lineAdjust = marginHeight;
  doc.setFont('helvetica', 'bold').setFontSize(fontSize*1.2).text(`Answers: on ${subject}`, 30, oneLineHeight * lineAdjust);
  doc.setFont('helvetica', 'normal').setFontSize(fontSize);
  for (let i = 0; i < answers.length; i++) {
    lineAdjust++;
    doc.text(`${i + 1})    ` + answers[i], 30, lineAdjust * oneLineHeight);
  }
  doc.setFont('helvetica', 'normal').setFontSize(fontSize * 0.6).text([`A quiz by Quizzify-AI`, 'www.quizzify-ai.com'], 105, oneLineHeight * (questions.length + lineAdjust + 3), { align: 'center' });
  doc.save(file);
}

export default createMultiChoicePdf;