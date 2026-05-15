Karthik — NSS Preference Submission Portal
==========================================

A department preference submission portal for NSS, IIT Bombay, built using
HTML, CSS, and JavaScript as part of the web development assignment.


ASSIGNMENT REQUIREMENTS COVERED
--------------------------------
- Form with name, email, and message fields                 [YES]
- Responsive design with mobile support                     [YES]
- Clean UI with consistent color scheme                     [YES]
- Responsive navbar (visible on desktop)                    [YES]
- Hamburger toggle menu for mobile                          [YES]
- LocalStorage to save and persist submissions              [YES]
- Edit and Delete individual entries                        [YES]
- Duplicate roll number validation                          [YES]


FILE STRUCTURE
--------------
Karthik/preference/
  q2.html      ->  Main HTML, form and submissions table
  q2.css       ->  Stylesheet, layout, responsive design
  q2.js        ->  All logic, localStorage, validation, CRUD
  logo.png     ->  NSS logo used in navbar


SECTIONS
--------
- Navbar       : NSS logo, title, motto, and navigation links
- Form         : Full name, roll number, LDAP email, personal email,
                 contact number, and 3 department preferences
- Table        : Displays all submitted entries with Edit and Delete


TECH STACK
----------
- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (localStorage for data persistence)


FEATURES
--------
- Submit department preferences (1st, 2nd, 3rd)
- Prevents duplicate preferences across the three selects
- Prevents duplicate roll number submissions
- Edit any existing entry and update it in place
- Delete individual entries with confirmation
- Clear all submissions at once
- Hamburger menu for mobile screens
- Responsive layout for mobile and desktop
