import compose from "compose-function";
import { withRouter } from "../with-router/withRouter";

export const withProviders = compose(withRouter);