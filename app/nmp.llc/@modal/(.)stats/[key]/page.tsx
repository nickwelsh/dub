import Stats from "#/ui/stats";
import Modal from "#/ui/modal";
import { Suspense } from "react";
import {PUBLIC_ROOT_DOMAIN} from '#/lib/constants'

export default function StatsModal({ params }: { params: { key: string } }) {
  return (
    <Modal className="max-h-[calc(100vh-150px)] w-full max-w-screen-xl overflow-auto bg-gray-50 scrollbar-hide">
      <Suspense>
        <Stats staticDomain={PUBLIC_ROOT_DOMAIN} staticKey={params.key} modal />
      </Suspense>
    </Modal>
  );
}
