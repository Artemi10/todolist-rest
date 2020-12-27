package devanmejia.models;

import lombok.*;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@AllArgsConstructor
@Data
public class Timeline {
    private Date startTimelineDate;
    private Date endTimelineDate;

    public Timeline(Date noteDate) {
        Calendar noteCalendar = new GregorianCalendar();
        noteCalendar.setTime(noteDate);
        Calendar startTimelineCalendar = new GregorianCalendar();
        Calendar endTimelineCalendar = new GregorianCalendar();
        startTimelineCalendar.set(noteCalendar.get(Calendar.YEAR), noteCalendar.get(Calendar.MONTH), 1);
        endTimelineCalendar.set(noteCalendar.get(Calendar.YEAR), noteCalendar.get(Calendar.MONTH), noteCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        this.startTimelineDate = startTimelineCalendar.getTime();
        this.endTimelineDate =  endTimelineCalendar.getTime();
    }

    public boolean isDateUnexpired(Date date){
        return startTimelineDate.before(date) && endTimelineDate.after(date)
                ||startTimelineDate.equals(date)
                ||endTimelineDate.equals(date);
    }
}
