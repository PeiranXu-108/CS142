'use strict';
class DatePicker {
    constructor(id, callback) {
        this.container = document.getElementById(id);
        this.id = id;
        this.callback = callback;
        this.selectedDate = new Date();
    }

    static getMonthName(monthIndex) {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ][monthIndex];
    }
    render(date) {
        this.selectedDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const month = this.selectedDate.getMonth();
        const year = this.selectedDate.getFullYear();
        this.container.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'calender-hearder';

        const prev = document.createElement('button');
        prev.textContent = '<';
        prev.onclick = () => this.render(new Date(year, month - 1, 1));

        const next = document.createElement('button');
        next.textContent = '>';
        next.onclick = () => this.render(new Date(year, month + 1, 1));

        const title = document.createElement('span');
        title.className = 'calender-title';
        title.textContent = `${DatePicker.getMonthName(month)} ${year}`;

        header.appendChild(prev);
        header.appendChild(title);
        header.appendChild(next);
        this.container.appendChild(header);

        const daysRow=document.createElement('div');
        daysRow.className='calender-days';
        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
            const cell = document.createElement('div');
            cell.className = 'calendar-day-label';
            cell.textContent = day;
            daysRow.appendChild(cell);
          });
          this.container.appendChild(daysRow);
          const grid = document.createElement('div');
          grid.className = 'calendar-grid';
      
          const firstDayOfMonth = new Date(year, month, 1);
          const startDay = firstDayOfMonth.getDay();
          const current = new Date(year, month, 1 - startDay); 
      
          for (let week = 0; week < 6; week++) {
            for (let d = 0; d < 7; d++) {
              const cell = document.createElement('div');
              cell.className = 'calendar-day';
              cell.textContent = current.getDate();
      
              if (current.getMonth() !== month) {
                cell.classList.add('dimmed'); // Not part of current month
              } else {
                cell.onclick = () => {
                  this.callback(this.id, {
                    month: current.getMonth() + 1,
                    day: current.getDate(),
                    year: current.getFullYear()
                  });
                };
              }
      
              grid.appendChild(cell);
              current.setDate(current.getDate() + 1);
            }
      
            // Break early if we’ve passed the current month
            if (current.getMonth() > month && current.getDate() > 7) break;
          }
      
          this.container.appendChild(grid);
          console.log('Rendering calendar for:', month, year);
    }


}
