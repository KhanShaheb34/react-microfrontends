echo "============== CLEANING =============="
rm -rf ./build
rm -rf ./*/dist

echo "============== BUILDING =============="
(cd first-app && npm run build)
(cd second-app && npm run build)
(cd navbar && npm run build)
(cd root-config && npm run build)

echo "============== COPYING ==============="
mkdir -p ./build/got ./build/rnm ./build/nav
cp -r ./first-app/dist/. ./build/got
cp -r ./second-app/dist/. ./build/rnm
cp -r ./navbar/dist/. ./build/nav
cp -r ./root-config/dist/. ./build

echo "============== CLEANING =============="
rm -rf ./*/dist

echo "============ START SERVER ============"
npx live-server ./build --port=9000 --host=localhost

echo "================ DONE ================"