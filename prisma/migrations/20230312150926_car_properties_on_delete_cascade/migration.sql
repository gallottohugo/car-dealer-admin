-- DropForeignKey
ALTER TABLE "car_properties" DROP CONSTRAINT "car_properties_carId_fkey";

-- AddForeignKey
ALTER TABLE "car_properties" ADD CONSTRAINT "car_properties_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
