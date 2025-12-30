const Project = require("../models/Project");
const Purchase = require("../models/Purchase");

// 🔹 Admin: add project
exports.addProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ message: "Project added", project });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 🔹 Student: list/search projects
exports.listProjects = async (req, res) => {
  try {
    const { q, domain } = req.query;
    const filter = {};

    if (q) filter.title = { $regex: q, $options: "i" };
    if (domain) filter.domain = domain;

    const projects = await Project.find(filter).select(
      "title domain techStack difficulty isPaid price"
    );

    res.json(projects);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 🔐 Student: project details with PAID ACCESS CHECK
exports.getProjectWithAccess = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Free project → allow access
    if (!project.isPaid) {
      return res.json(project);
    }

    // 🔒 Paid project → check purchase
    const purchase = await Purchase.findOne({
      userId: req.user.id,
      projectId: project._id,
      status: "paid"
    });

    if (!purchase) {
      return res.status(403).json({
        message: "Payment required to access full project",
        price: project.price
      });
    }

    // ✅ Purchased → allow access
    res.json(project);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
