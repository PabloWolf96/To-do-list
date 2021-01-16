import datetime
month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
'November', 'December']
day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

def today():
    tdy = datetime.date.today()
    d = tdy.day
    w = day[tdy.weekday()]
    m = month[tdy.month - 1]
    return [d, w, m]

print(today())

