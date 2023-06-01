import Joi from 'joi';

const articleSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.allow(''),
  image: Joi.allow(''),
});


const articleUpdateSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    author: Joi.string(),
    category: Joi.string(),
    tags: Joi.allow(''),
    image: Joi.allow(''),
    viewsCount: Joi.number().integer(),
    likesCount: Joi.number().integer(),
    updatedAt: Joi.date().iso()
  });
  

  
export const validationArticle = (req, res, next) => {
  const { error } = articleSchema.validate(req.body);

  if (error) {
    // Validation failed
    const errorMessage = error.details[0].message;
    console.log("error",errorMessage)
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

export const validateArticleUpdate = (req, res, next) => {
    const { error } = articleUpdateSchema.validate(req.body);
  
    if (error) {
      // Validation failed
      const errorMessage = error.details[0].message;
      console.log("error",errorMessage)
      return res.status(400).json({ error: errorMessage });
    }
  
    next();
  };
