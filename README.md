# Student ID Barcode Attendance taker

### Software/Services used
    
   - Visual Studio Code
   - Cordova 
   - IFTTT https://ifttt.com
   - Google Spreadsheet 

### Setup Instructions
	
#### Google Drive/Spreadsheet
1. Create a spreadsheet identical to [Attendance](/attendance.xlsx) on Google Spreadsheet.  The columns and sheets arrangement must be the same.
2. Go to *Tools > Script Editor* and paste the [Google Script](/googlescripts.gs)
3. Refresh G Spreadsheet and a menu item named "Manage Data" will appear at the end of the menu bar after it is loaded.
4. Refer to the commented lines in the script for each function.
5. Prefill student ID, card ID and student Name prior starting to use the app.
6. Recommended to put the admin details at the top of the sheet

#### IFTTT
1. Create a new applet with *this* being **Webhooks** and *that* being **Google Spreadsheet**
3. Fill in all the details and replace **formatted row** with ```{{Value1}} ||| {{Value2}} |||{{Value3}} ||| {{OccurredAt}}```
4. Get the webhook URL from **Services**. 

Example: ``` https://maker.ifttt.com/trigger/<replace event name>/with/key/<replace your key> ```

#### Amend index.js
Read the commented lines and update the password and webhook URL. Also check for the types of barcode that you need to scan.

#### Cordova
1. Update config.xml and download the packages.
2. Export to Android / iOS.

---

### Operating flow
1. User opens the Spreadsheet and key in the date time at the end of column in this format ```dd/mm/yyyy DDD```
2. User opens the app, scans own ID and key in password
2. User starts scanning attendee's ID
3. Data gets added to Check-in log
4. User then run **Manage Data > Update Log to Tracker** on Spreadsheet

### System flow
1. Every entry will get added to the bottom check-in log
2. Update Log to Tracker function will search for the date followed by the card number of the student before putting a Y in the cell.
3. Once a Y is put, a *checked* will be added to the last column of the entry
4. This log will go continously so you can clean it once in a while through other function in the menu.

---

**Example live app**

- [NPTaekwondoAttendance](https://play.google.com/store/apps/details?id=com.codeweb.NPTaekwondoAttendance)



---
#### **Credits**
   Copyright [2019] [cweitat]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.-editor).  
    
    
