/** @OnlyCurrentDoc */

function onOpen(){
  SpreadsheetApp.getUi().createMenu('Manage Data')
  .addItem('Update Log to Tracker', 'formatlogtotext')
  .addItem('Delete `checked` rows in Log', 'removecheckedlog')
  .addItem('Remove Empty Rows & Columns in Tracker', 'removeEmptyTracker')
  .addItem('Remove Empty Rows & Columns in Log', 'removeEmptyLog')
  .addToUi();
}

function updateTracker() {
  var logsheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = logsheet.getDataRange().getValues();
  var trackersheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tracker');
  var headerrow = trackersheet.getRange(1, 1, 1, trackersheet.getMaxColumns()); 
  var cardidcol = trackersheet.getRange(2, 3, trackersheet.getMaxRows(), 1);

  for (var i = 1; i < data.length; i++) {
    //  [0] cardid, [1] date, [2] adminid, [3] datetime, [4] status
    var cardid = data[i][0];
    var date = data[i][1];
    var statuschecked = data[i][4];
    if (statuschecked != "checked"){
      //find card row
      var cardidfinder = cardidcol.createTextFinder(cardid).matchEntireCell(true).findNext();
      if (cardidfinder != null){
         var idrow = cardidfinder.getRow();
        //find date col
        var datecol = headerrow.createTextFinder(date).matchEntireCell(true).findNext().getColumn();
        //update cell to present
        trackersheet.getRange(idrow, datecol).setValue('Y');
        //update log to checked
        logsheet.getRange(i+1, 5).setValue('checked');
      } else {
        //if card id not found in tracker sheet then stop
        var ui =  SpreadsheetApp.getUi();
        ui.alert('Card ID: '+ cardid +' not found.');
      }
    }
  }
}

//delete rows of checked status
function removecheckedlog() {
  var logsheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var cardidcol = logsheet.getRange(1, 5, logsheet.getMaxRows(), 1);
  while (cardidcol.createTextFinder('checked').findNext().getRow() != null) {
    var rowindex = cardidcol.createTextFinder('checked').findNext().getRow();  
    logsheet.deleteRow(rowindex);
  };
}

//clear empty rows and columns in log
function removeEmptyLog(){
var logsheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
var maxColumns = logsheet.getMaxColumns(); 
var lastColumn = logsheet.getLastColumn();
if (maxColumns-lastColumn != 0){
   logsheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
  }

var maxRows = logsheet.getMaxRows(); 
var lastRow = logsheet.getLastRow();
if (maxRows-lastRow != 0){
    logsheet.deleteRows(lastRow+1, maxRows-lastRow);
   }
}

//clear empty rows and columns in tracker
function removeEmptyTracker(){
var trackersheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tracker');
var maxColumns = trackersheet.getMaxColumns(); 
var lastColumn = trackersheet.getLastColumn();
if (maxColumns-lastColumn != 0){
   trackersheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
  }

var maxRows = trackersheet.getMaxRows(); 
var lastRow = trackersheet.getLastRow();
if (maxRows-lastRow != 0){
    trackersheet.deleteRows(lastRow+1, maxRows-lastRow);
   }
}

//format all cells to text to ensure able to search
function formatlogtotext(){
  var logsheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  logsheet.getRange(1, 1, logsheet.getMaxRows(), logsheet.getMaxColumns()).setNumberFormat('@STRING@'); 
  
  var trackersheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tracker');
  trackersheet.getRange('1:1').setNumberFormat('@STRING@'); 
  trackersheet.getRange('A:C').setNumberFormat('@STRING@'); 
  updateTracker();
}
