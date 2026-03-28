const { PDFParse } = require('pdf-parse');
// Mock a minimal PDF buffer (this is just for testing if the class method exists)
const mockBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');

async function test() {
    try {
        console.log('Testing PDFParse with data...');
        const parser = new PDFParse({ data: mockBuffer });
        console.log('Parser instance created.');
        if (parser.getText) {
            console.log('getText method found.');
        } else {
            console.log('getText method NOT found.');
        }
    } catch (e) {
        console.log('Error:', e.message);
    }
}

test();
