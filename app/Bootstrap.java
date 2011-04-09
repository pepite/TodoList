import models.Item;
import play.Play;
import play.jobs.Job;
import play.jobs.OnApplicationStart;
import play.test.Fixtures;

@OnApplicationStart
public class Bootstrap extends Job {

	@Override
    public void doJob() {
        if (Play.mode == Play.Mode.DEV) {
            if (Item.count() == 0) {
                Fixtures.load("test-data.yml");
            }
        }
    }

}
