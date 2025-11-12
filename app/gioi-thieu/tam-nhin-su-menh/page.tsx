import { StrapiApi } from '../../config/api';

export default async function VisionAndMissionPage() {
  const api = new StrapiApi();
  const [vision, mission] = await Promise.all([
    api.getVision(),
    api.getMission(),
  ]);

  console.log('vision', vision);
  console.log('mission', mission);

  return null;
}
