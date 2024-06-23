import mongoose from "mongoose";
import Express from "express";
import cors from "cors";
import { User } from "./DB/main.js";
import XLSX from "xlsx";
import fs from "fs";

const DB =
  "mongodb+srv://vishu7im:teranaam.im7@cluster0.4tmteql.mongodb.net/counseling";

const app = Express();
const PORT = 8000;

app.use(Express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server vishal");
});

// Compare by age (DOB in ascending order)
const parseDate = (dateString) => {
  const parts = dateString.split(/[\/-]/);
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      // Format: yyyy-mm-dd
      return new Date(dateString);
    } else {
      // Format: dd/mm/yyyy
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
  }
  return new Date(dateString);
};

app.post("/newUser", async (req, res) => {
  const input = req.body;
  // console.log(input);
  const data = new User(input);

  try {
    await data.save();

    res.status(200).json({ msg: `${input.Name} 's form save ` });
  } catch (error) {
    res.status(404).json({ msg: "err" });
  }
});

app.post("/Report", async (req, res) => {
  try {
    const {
      DET,
      DAT,
      AIC,
      GENERAL,
      SC_SCD,
      BCA_BCB,
      TFW,
      EWS,
      PM_Care,
      HARIHAR,
      OTHER,
    } = req.body;

    // Build the query object based on conditions
    const query = {};

    if (DET === 1 && DAT === 0) {
      query.Course = "Diploma Engg Lateral Entry";
    } else if (DAT === 1 && DET === 0) {
      query.Course = "Diploma Engg";
    } else if (DAT === 1 && DET === 1) {
      res.status(404).json({ err: "select only one" });
    } else {
      res.status(404).json({ err: "Somthing went wrong " });
    }

    const categories = [
      {
        name: "AIC",
        value: "AIC",
      },
      {
        name: "GENERAL",
        value: "GENERAL",
      },
      {
        name: "SC_SCD",
        value: "SC/SCD",
      },
      {
        name: "BCA_BCB",
        value: "BCA/BCB",
      },
      {
        name: "TFW",
        value: "TFW",
      },
      {
        name: "EWS",
        value: "EWS",
      },
      {
        name: "PM_Care",
        value: "PM Care",
      },
      {
        name: "HARIHAR",
        value: "HARIHAR",
      },
      {
        name: "OTHER",
        value: "OTHER",
      },
    ];

    const selectedCategories = categories.filter(
      (category) => req.body[category.name] === 1
    );
    let selectedValues;
    if (selectedCategories.length < 8) {
      selectedValues = selectedCategories.map((category) => category.value);
      query.Category = { $in: selectedValues };
    }

    const results = await User.find(query).sort({ Percentage: -1 }).lean();

    //  merge for catogry 

let mergedMap = {}

  results.map((item)=>{
    if (!mergedMap[item.RegistrationNo]) {
      mergedMap[item.RegistrationNo] = { ...item };
    } else {
      mergedMap[item.RegistrationNo].Category += '/' + item.Category;
    }
  })

  const expected = Object.values(mergedMap)


    let studentsData;
    if (DET === 1 && DAT === 0) {
      studentsData = expected.map((data) => {
        delete data.__v;
        delete data._id;
        delete data.Math;
        delete data.Physics;
        delete data.English;

        return data;
      });

      studentsData.sort((a, b) => {
        // First, compare by percentage in descending order
        if (b.Percentage !== a.Percentage) {
          return b.Percentage - a.Percentage;
        }
        const dobA = parseDate(a.DOB);
        const dobB = parseDate(b.DOB);

        if (dobA.getTime() !== dobB.getTime()) {
          return dobA.getTime() - dobB.getTime();
        }

        // Finally, compare alphabetically by name
        return a.Name.localeCompare(b.Name);
      });
    } else if (DAT === 1 && DET === 0) {
      studentsData = expected.map((data) => {
        delete data.__v;
        delete data._id;
        delete data.Qualification;
        data.science = data.Physics;
        delete data.Physics;
        data.math = data.Math;
        delete data.Math;
        data.english = data.English;
        delete data.English;

        return data;
      });

      studentsData.sort((a, b) => {

        // First, compare by percentage in descending order
        if (b.Percentage !== a.Percentage) {
          return b.Percentage - a.Percentage;
        }

        // Then, compare by math marks
        if (b.Math !== a.Math) {
          return b.Math - a.Math;
        }

        // Next, compare by physics marks
        if (b.Physics !== a.Physics) {
          return b.Physics - a.Physics;
        }

        // After that, compare by English marks
        if (b.English !== a.English) {
          return b.English - a.English;
        }

        const dobA = parseDate(a.DOB);
        const dobB = parseDate(b.DOB);

        if (dobA.getTime() !== dobB.getTime()) {
          return dobA.getTime() - dobB.getTime();
        }
        // Finally, compare alphabetically by name
        return a.Name.localeCompare(b.Name);
      });
    }


    if (DET === 1 && DAT === 0) { 
 //  setup rank
    studentsData = studentsData.map((data, i) => {
      data.Rank = "L"+(parseInt(i) + parseInt(1));

      return data;
    });
    } else if (DET === 0 && DAT === 1) { 
 //  setup rank
    studentsData = studentsData.map((data, i) => {
      data.Rank = "D"+(parseInt(i) + parseInt(1));

      return data;
    });
    }

   

    // rule function

    const ws = XLSX.utils.json_to_sheet(studentsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Specify the path where you want to save the file
    const filePath = `doc/${query.Course}${AIC === 1 ? "-AIC" : ""}${
      GENERAL === 1 ? "-GENERAL" : ""
    }${SC_SCD === 1 ? "-SC_SCD" : ""}${BCA_BCB === 1 ? "-BCA_BCB" : ""}${
      TFW === 1 ? "-TFW" : ""
    }${EWS === 1 ? "-EWS" : ""}${PM_Care === 1 ? "-PM_Care" : ""}${
      HARIHAR === 1 ? "-HARIHAR" : ""
    }${OTHER === 1 ? "-OTHER" : ""}-${Date.now()}.xlsx`;

    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });

        // Handle the error appropriately
      } else {
        res.status(200).json({ msg: "file save " });

        // Perform any additional actions after saving
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/UpdateUser", async (req, res) => {
  const input = req.body;

  try {
    await User.findByIdAndUpdate({ _id: input.uuid }, input);
    res.status(200).json({ data: "success" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/deleteUser", async (req, res) => {
  const { uuid } = req.body;

  try {
    const data = await User.findByIdAndDelete({ _id: uuid });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/fetchSingle/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findOne({ _id: id });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/userlist/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const results = await User.find({ Course: id })
      .sort({ Percentage: -1 })
      .lean();

    let studentsData;

    if (id === "Diploma Engg") {
      studentsData = results.map((data) => {
        delete data.__v;
        delete data.Math;
        delete data.Physics;
        delete data.English;

        return data;
      });

      studentsData.sort((a, b) => {
        // First, compare by percentage in descending order
        if (b.Percentage !== a.Percentage) {
          return b.Percentage - a.Percentage;
        }
        const dobA = parseDate(a.DOB);
        const dobB = parseDate(b.DOB);

        if (dobA.getTime() !== dobB.getTime()) {
          return dobA.getTime() - dobB.getTime();
        }

        // Finally, compare alphabetically by name
        return a.Name.localeCompare(b.Name);
      });
    } else if (id === "Diploma Engg Lateral Entry") {
      studentsData = results.map((data) => {
        delete data.__v;
        delete data.Qualification;

        return data;
      });

      studentsData.sort((a, b) => {
        // First, compare by percentage in descending order
        if (b.Percentage !== a.Percentage) {
          return b.Percentage - a.Percentage;
        }

        // Then, compare by math marks
        if (b.Math !== a.Math) {
          return b.Math - a.Math;
        }

        // Next, compare by physics marks
        if (b.Physics !== a.Physics) {
          return b.Physics - a.Physics;
        }

        // After that, compare by English marks
        if (b.English !== a.English) {
          return b.English - a.English;
        }

        const dobA = parseDate(a.DOB);
        const dobB = parseDate(b.DOB);

        if (dobA.getTime() !== dobB.getTime()) {
          return dobA.getTime() - dobB.getTime();
        }

        // Finally, compare alphabetically by name
        return a.Name.localeCompare(b.Name);
      });
    }

    let studentsListData
    if (id === "Diploma Engg Lateral Entry") { 
      //  setup rank
         //  setup rank
     studentsListData = studentsData.map((data, i) => {
      let obj = {
        id: (parseInt(i) + parseInt(1)),
        Rank: "L"+(parseInt(i) + parseInt(1)),
        Registration: data.RegistrationNo,
        Name: data.Name,
        Course: data.Course,
        Cateogry: data.Category,
        Gender: data.Gender,
        DOB: data.DOB,
        Addhaar: data.AadhaarNo,
        Percentage: data.Percentage,
        Mobile: data.StudentMobileNo,
        view: data._id,
      };

      return obj;
    });
         } else if (id === "Diploma Engg") { 
      //  setup rank
      studentsListData = studentsData.map((data, i) => {
        let obj = {
          id: i + 1,
          Rank: "D"+(parseInt(i) + parseInt(1)),
          Registration: data.RegistrationNo,
          Name: data.Name,
          Course: data.Course,
          Cateogry: data.Category,
          Gender: data.Gender,
          DOB: data.DOB,
          Addhaar: data.AadhaarNo,
          Percentage: data.Percentage,
          Mobile: data.StudentMobileNo,
          view: data._id,
        };
  
        return obj;
      });
         }
     
  
    res.status(200).json({ data: studentsListData });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connection success ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
