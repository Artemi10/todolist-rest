import devanmejia.models.Timeline;
import org.junit.Assert;
import org.junit.Test;

import java.sql.Time;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class TestTimeline {
    @Test
    public void testIsDateUnexpired(){
        Date startDate = new GregorianCalendar(2002, Calendar.MAY, 3).getTime();
        Date endDate  = new GregorianCalendar(2022, Calendar.MAY, 3).getTime();
        Timeline timeline = new Timeline(startDate, endDate);
        Assert.assertTrue(timeline.isDateUnexpired(new Date()));
    }
    @Test
    public void testIsDateExpired(){
        Date startDate = new GregorianCalendar(2002, Calendar.MAY, 3).getTime();
        Date endDate  = new GregorianCalendar(2012, Calendar.MAY, 3).getTime();
        Timeline timeline = new Timeline(startDate, endDate);
        Assert.assertFalse(timeline.isDateUnexpired(new Date()));
    }
}
