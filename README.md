rjDateparse
=========

AngularJs module to transform any date value into friendly, human readable dates.

This module also also turns the date into a clickable link, so the user can syphon through the dates.

Optionally use with rjPreference to store the user choice in their local storage.


##Usage

Simply add an attribute of `date-toggle="2014/10/10 23:20"` - the date format can be any that can be parsed. If it cannot parse the date, it will simply use the original.

**Important:** This module requires [momentjs](http://momentjs.com/)