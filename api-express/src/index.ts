import app from "./app";
import { PORT } from "~/config";

app.listen(Number(PORT), process.env.HOST || "0.0.0.0", () => console.log(`RUN ON PORT ${PORT}`));
