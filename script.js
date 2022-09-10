function reverseStr(str) {
    var ListOfChar = str.split("")
    var reverseListOfChar = ListOfChar.reverse()
    var reversedStr = reverseListOfChar.join("")
    return reversedStr
  }
  console.log(reverseStr("hello"))
  
  function isStrPalindrome(str) {
    var reverse = reverseStr(str)
    if (str === reverse) {
      return true;
    }
    return false;
  }
  //console.log(isStrPalindrome("lol"))
  function convertDateToStr(date) {
    var dateStr = { day: "", month: "", year: "" };
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
  }
  
  //console.log(convertDateToStr(date))
  function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
  }
  
  //console.log(getAllDateFormats(date))
  
  function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    let flag=false;
    
  
    for (var i = 0; i < listOfPalindromes.length; i++) {
      if (isStrPalindrome(listOfPalindromes[i])) {
      flag=true
        break
      }
    }
      return flag;
    }
  // var date={day:2,month:1,year:2020}
  //  console.log(checkPalindromeForAllDateFormats(date))
    function isLeapYear(year) {
      if (year % 400 === 0) {
        return true;
      }
      if (year % 100 === 0) {
        return false;
      }
      if (year % 4 === 0) {
        return true;
      }
      return false;
    }
  //  var year=2020;
  //  console.log(isLeapYear(year))
  
    function getNextDate(date) {
      var day = date.day+1;
      var month = date.month;
      var year = date.year;
  
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (month === 2) {
        if (isLeapYear(year)) {
          if (day > 29) {
            day = 1;
            month = 3;
          }
        }
        else {
          if (day > 28) {
            day = 1;
            month = 3;
          }
        }
      }
      else {
        if (day > daysInMonth[month - 1]) {
          day = 1;
          month++;
        }
      }
      if (month > 12) {
        month = 1;
        year++;
      }
  
      return {
        day: day,
        month: month,
        year: year
      }
    }
    // date={day:25,month:2,year:2020}
    // console.log(getNextDate(date))
  
    function getNextPalindromeDate(date) {
      var ctr = 0;
      var nextDate = getNextDate(date);
      while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate)
          if (isPalindrome) {
            break
          }
        nextDate = getNextDate(nextDate)
      }
            return [ctr, nextDate];
          }
  
  function getPreviousDate(date) {
      var day = date.day - 1;
      var month = date.month;
      var year = date.year;
  
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (day === 0) {
            month--;
       
          if (month===0) {
            month = 12;
            day=31;
            year--;
          }
      else if(month===2){
         if(isLeapYear(year)){
          day=29;
         }
      else{
        day=28;
      }
    }
        else{
          day=daysInMonth[month-1]  
        }
      } 
  
      return {
        day: day,
        month: month,
        year: year
      }
    }
  function getPreviousPalindromeDate(date) {
      var ctr= 0;
      var previousDate = getPreviousDate(date);
      while (1) {
        ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(previousDate)
          if (isPalindrome) {
            break
          }
        previousDate = getPreviousDate(previousDate)
      }
            return [ctr, previousDate];
  }
  //var previousDate={day:25,month:2,year:2020}
  // console.log (getPreviousPalindromeDate(ctr,previousDate))
  
    var inputDate = document.querySelector("#date-of-birth")
    var showButton = document.querySelector("#show-button")
    var getMessage = document.querySelector("#message")
      showButton.addEventListener('click', clickHandler);
  
    function clickHandler() {
      var bdayStr = inputDate.value;
  
      if (bdayStr != "") {
        var listOfDate=bdayStr.split("-")
        var date={
          day:Number(listOfDate[2]),
          month:Number(listOfDate[1]),
          year:Number(listOfDate[0])
        }
      }
  var isPalindrome=(checkPalindromeForAllDateFormats(date))
        if (isPalindrome){
          getMessage.innerText="yay!your birthday is palindrome"
        }else{  
      var [nextDateCount,nextDate]=getNextPalindromeDate(date)
          var[previousDateCount,previousDate]=getPreviousPalindromeDate(date)
          getMessage.innerText=`The next palindrome date is ${nextDate.day}/${nextDate.month}/${nextDate.year}, you missed it by ${nextDateCount} days.The previous palindrome date was ${previousDate.day}/${previousDate.month}/${previousDate.year}, you missed it by ${previousDateCount} days`
       }
      }
  
  
    