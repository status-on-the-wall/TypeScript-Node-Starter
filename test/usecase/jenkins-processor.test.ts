import { JenkinsProcessor } from "../../src/usecase/jenkins-processor";
import { BuildResultTo } from "../../src/usecase/build-result-to";
import { StatusEnum } from "../../src/usecase/status-enum";

describe("JenkinsProcessor", () => {
  var jenkinsProcessor: JenkinsProcessor;

  beforeEach(() => {
    jenkinsProcessor = new JenkinsProcessor();
  });

  it("should process feature/SUCCESS", () => {
    // given
    const buildResult: BuildResultTo = {
      buildNumber: 1,
      jobName: "tsara-frontend-multibranch/feature%2FPUMANEXT-1858",
      status: StatusEnum.SUCCESS,
      timestamp: new Date(2018, 3)
    };

    // when
    jenkinsProcessor.process(buildResult);
  });
});
