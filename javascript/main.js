
function loadCSV() {

    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const csvData = event.target.result;
            const rows = csvData.split('\n'); // Dividi per righe

            const dataArray = rows.map(row => row.split(',')); // Dividi ogni riga per le virgole e inseriscila nell'array

            console.log(dataArray); // Mostra i dati in console
            // Ora dataArray contiene i dati del CSV
            // Array diviso in dataArray = {[PartNumber][MaterialName]}
            if(dataArray.length != 0){
                for(let i = 1; i < dataArray.length - 1; i++){
                    var snlbl = `SN-${dataArray[i][0]}-${moment().format('YYYYDD')}-${random(100,999)}`;
                    JsBarcode("#barcode"+ (i), snlbl,{width:1.5});
                    var headEl = document.getElementById('head' + (i));
                    headEl != null ? headEl.innerHTML = dataArray[i][1] : 0;
                }
            }



        };

        reader.onerror = function() {
            console.error("Errore durante la lettura del file!");
        };

        reader.readAsText(file);
    } else {
        alert("Seleziona un file CSV prima di procedere.");
    }
}

function random(min,max) {
    return Math.floor((Math.random())*(max-min+1))+min;
}

function generatePDF() {
    // Choose the element that your content will be rendered to.
    document.getElementById('download-button').setAttribute('hidden','');
    document.getElementById('download-spinner').removeAttribute('hidden','');

    const element = document.getElementById('pdfEl');
    var now = moment().format("YYYYMMDD");
    var fileName = `SN-${now}.pdf`;

    var opt = {
        pagebreak: { mode: 'avoid-all', before: '#page2el' },
        margin: 15,
        jsPDF: {orientation: 'landscape'}
    };

    // Choose the element and save the PDF for your user.
    html2pdf().set(opt).from(element).save(fileName).then(function(){
        document.getElementById('download-spinner').setAttribute('hidden','');
        document.getElementById('download-button').removeAttribute('hidden','');

    });
}
