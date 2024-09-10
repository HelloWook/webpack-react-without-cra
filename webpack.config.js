// 필요한 플러그인들을 require로 불러옵니다.
const HtmlWebpackPlugin = require("html-webpack-plugin"); // HTML 파일을 자동으로 생성해주는 플러그인
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 빌드 폴더를 정리해주는 플러그인
const path = require("path"); // 경로 조작을 위한 Node.js 기본 모듈
const webpack = require("webpack"); // Webpack API를 사용하기 위해 불러옵니다.

module.exports = (env, argv) => {
  // Webpack 설정을 함수로 정의합니다. env와 argv는 CLI에서 전달된 환경 변수와 인자를 나타냅니다.
  const prod = argv.mode === "production"; // 현재 모드가 "production"인지 확인하여 prod 변수에 저장

  return {
    mode: prod ? "production" : "development", // 모드 설정: production 또는 development
    devtool: prod ? "hidden-source-map" : "eval", // 소스 맵 생성 방식 설정: 프로덕션에서는 숨겨진 소스 맵을 사용하고, 개발에서는 eval 방식 사용
    entry: "./src/index.tsx", // 엔트리 파일 경로 설정
    output: {
      path: path.join(__dirname, "/dist"), // 빌드 결과물을 저장할 폴더 경로 설정
      filename: "[name].js", // 출력 파일 이름 형식 설정
    },
    devServer: {
      port: 3000, // 개발 서버 포트 번호 설정
      hot: true, // 모듈 핫 리플레이스먼트(Hot Module Replacement) 활성화
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"], // 모듈을 해석할 때 확장자 목록 설정
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // .ts 또는 .tsx 확장자를 가진 파일에 대해
          use: ["babel-loader", "ts-loader"], // Babel과 TypeScript 로더를 사용하여 변환
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: "react", // 모든 모듈에서 React를 자동으로 불러오도록 설정
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html", // 템플릿으로 사용할 HTML 파일 경로
        // 프로덕션 환경에서는 HTML 파일을 압축
        minify:
          process.env.NODE_ENV === "production"
            ? {
                collapseWhitespace: true, // 공백 제거
                removeComments: true, // 주석 제거
              }
            : false, // 개발 환경에서는 압축하지 않음
      }),
      new CleanWebpackPlugin(), // 빌드할 때마다 /dist 폴더를 정리
    ],
  };
};
