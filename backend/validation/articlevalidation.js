import Joi from 'joi';

const articleSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  publishedAt: Joi.date().iso().required(),
  updatedAt: Joi.date().iso().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
  image: Joi.string().allow(''),
  viewsCount: Joi.number().integer().min(0).allow(''),
  likesCount: Joi.number().integer().min(0).allow(''),
});

const articleUpdateSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    author: Joi.string(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    image: Joi.string(),
    viewsCount: Joi.number().integer(),
    likesCount: Joi.number().integer(),
    updatedAt: Joi.date().iso()
  });
  

  
export const validationArticle = (req, res, next) => {
  const { error } = articleSchema.validate(req.body);

  if (error) {
    // Validation failed
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

export const validateArticleUpdate = (req, res, next) => {
    const { error } = articleUpdateSchema.validate(req.body);
  
    if (error) {
      // Validation failed
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
  
    next();
  };
