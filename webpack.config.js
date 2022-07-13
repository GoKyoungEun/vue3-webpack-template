
// path: Node.JS에서 파일 및 디렉토리 경로 작업을 위한 적역 모듈
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports = {
  resolve: {
    // 경로에서 확장자를 따로 명시하지 않아도 오류가 안생김
    extensions: ['.js', '.vue'],
    // 경로별칭(Alias): ./이나 ../로 시작하는 경로를 별칭 ~ 로 만들어서 사용한다.
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },
  // parcel main.js
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // __dirname: 현재 파일이 있는 그 경로를 나타내는 하는 node.js의 전역적인 변수
    // resolve: __dirname와 dist 폴더를 합쳐서 절대적인 경로를 제공
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',

    // 구성옵션을 바꿨을 때 전에 만들어 놓은 파일이 자동으로 제거됨
    clean: true  // Clean the output directory before emit.
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      { // .scss로 끝나는 확장자를 찾는데 s는 있을 수도 없을 수도 있다.
        test: /\.s?css$/,
        use: [
          // 순서중요!
          // vue확장자로 끝나는 파일들의 내부에서 style이라는 태그로 css 내용을 
          // 작성한 내용을 해석해서 동작시켜줄 수 있도록 도와준다.
          'vue-style-loader',
          // 아래 해석된 내용을 html파일에 삽입해줌
          'style-loader',
          // js파일에서 css파일을 해석할 수 있게 도와줌
          'css-loader',
          // sass에서 해석된 내용을 postcss-loader를 통해 공급업체 접두사를 붙여준다.
          'postcss-loader',
          // css-loader보다 sass-loader가 먼저 실행되어야 한다.
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      { // png|jpe?g|gif|webp 확장가를 가진 파일들이 있으면 
        // 브라우저에서 동작시킬 수 있도록 도와줌
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    host: 'localhost'
  }
}