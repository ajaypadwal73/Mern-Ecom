const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if(err){
            return res.status(404).json({
                error: "Cayegory not found in dB"
            });
        }

        req.category = cate;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      res.json({ category });
    });
  };

exports.getCategory= (req, res) =>{
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error:"NO Categories found"
            });
        }

         res.json(categories);
    });
};

exports.updateCategory = (req, res) =>{
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error:"Failed to update category"
            });
        }
        
       res.send(updatedCategory);


    });
};

exports.removeCategory = (res, req) => {
    const category = req.category;
    category.remove((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error:"Failed to delete category"
            });
        }
        
       res.json({
           message: "Successfully deleted!"
       });


    })
}