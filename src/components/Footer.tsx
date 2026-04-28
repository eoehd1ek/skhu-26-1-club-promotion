export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="text-white text-lg font-bold mb-2">홍보 게시판</h2>
            <p className="text-sm">김대동/eoehd1ek powered 2026</p>
          </div>
          <div className="text-center max-w-xl">
            <p className="text-xs leading-relaxed opacity-70">
              본 서비스는 에브리타임 홍보 게시판의 데이터를 가공하여 제공합니다. <br />
              실시간 정보를 확인하려면 에브리타임 홍보 게시판을 방문해주세요. <br />
              정보 수정 및 삭제 요청은 에브리타임 게시글 쪽지로 연락바랍니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm mt-2 lg:mt-0">
            <a
              href="https://everytime.kr/378833/v/403236148"
              className="hover:text-white transition-colors duration-200 border border-gray-700 bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              에브리타임 게시글
            </a>
            <a
              href="https://github.com/eoehd1ek/skhu-26-1-club-promotion"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 border border-gray-700 bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
