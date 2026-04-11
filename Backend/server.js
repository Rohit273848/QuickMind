
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import  {testapi} from "./src/services/ai.service.js"


connectDB();

testapi()
app.listen(3000, () => {    
    console.log("Server is running on port 3000");
}   );