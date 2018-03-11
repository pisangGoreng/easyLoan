const numberToCurrency = (number) => {
  let rev = parseInt(number, 10).toString().split('').reverse().join('')
  let rev2 = ''
  for (let i = 0; i < rev.length; i++) {
    rev2 += rev[i]
    if ((i + 1) % 3 === 0 && i !== (rev.length - 1)) {
      rev2 += '.'
    }
  }
  return 'Rp. ' + rev2.split('').reverse().join('')
}

const getMonth = (number) => {
  let monthName = null
  switch (number) {
    case 1:
      monthName = 'January'
      break;
    
    case 2:
      monthName = 'February'
      break;

    case 3:
      monthName = 'March'
      break;

    case 4:
      monthName = 'April'
      break;

    case 5:
      monthName = 'May'
      break;

    case 6:
      monthName = 'June'
      break;

    case 7:
      monthName = 'July'
      break;

    case 8:
      monthName = 'August'
      break;

    case 9:
      monthName = 'September'
      break;

    case 10:
      monthName = 'October'
      break;

    case 11:
      monthName = 'November'
      break;

    case 12:
      monthName = 'December'
      break;

    default:
      monthName = 'error'
      break;
  }
  return monthName
}

const getTodayMonth = (number) => {
  let d = new Date();
  let month = new Array();
  month[0] = 1;
  month[1] = 2;
  month[2] = 3;
  month[3] = 4;
  month[4] = 5;
  month[5] = 5;
  month[6] = 7;
  month[7] = 8;
  month[8] = 9;
  month[9] = 10;
  month[10] = 11;
  month[11] = 12;
  let  n = month[d.getMonth()]

  return n
}

export default {
  numberToCurrency,
  getMonth,
  getTodayMonth
}