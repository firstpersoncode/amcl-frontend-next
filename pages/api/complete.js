import { withSession } from "context/AppSession";
import { createQRcode, deleteQRcodesBySchool } from "prisma/services/qrcode";
import { getSchool, updateSchool } from "prisma/services/school";
import generateUID from "utils/generateUID";

export default withSession(
  async function complete(req, res) {
    const school = await getSchool(user.id);
    if (!school) return res.status(404).send();

    if (school.completed) return res.status(403).send("QR Code sudah dibuat");

    await deleteQRcodesBySchool(school.id);
    await updateSchool(school.idString, { completed: true });

    const { participants } = school;
    for (const participant of participants) {
      const qrcode = {
        idString: `${participant.idString}-${generateUID()}`,
        ownerId: participant.id,
      };

      await createQRcode(qrcode);
    }

    res.status(201).send();
  },
  { roles: ["user"] }
);
