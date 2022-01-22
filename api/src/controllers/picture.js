// router.post("/picture", passport.authenticate("referent", { session: false, failWithError: true }), async (req, res) => {
//   try {
//     const files = Object.keys(req.files || {}).map((e) => req.files[e]);
//     let file = files[0];
//     // If multiple file with same names are provided, file is an array. We just take the latest.
//     if (Array.isArray(file)) {
//       file = file[file.length - 1];
//     }
//     const { name, data, mimetype } = file;
//     if (!["image/jpeg", "image/png"].includes(mimetype)) return res.status(500).send({ ok: false, code: "UNSUPPORTED_TYPE" });

//     const resultingFile = { mimetype: "image/png", data };
//     const filename = slugify(`/${Date.now()}-${name.replace(".png", "").replace(".jpg", "").replace(".jpeg", "")}`, {
//       replacement: "-",
//       remove: /[*+~.()'"!?:@]/g,
//       lower: true, // convert to lower case, defaults to `false`
//       strict: true, // strip special characters except replacement, defaults to `false`
//       locale: "fr", // language code of the locale to use
//       trim: true, // trim leading and trailing replacement chars, defaults to `true`
//     });
//     const result = await uploadPublicPicture(`${filename}.png`, resultingFile);
//     return res.status(200).send({ data: result.Location, ok: true });
//   } catch (error) {
//     capture(error);
//     if (error === "FILE_CORRUPTED") return res.status(500).send({ ok: false, code: ERRORS.FILE_CORRUPTED });
//     return res.status(500).send({ ok: false, code: ERRORS.SERVER_ERROR });
//   }
// });
