<template>
  <div class="landing-page">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">
        <h1>基于关键词匹配的三方隐私信息检索系统</h1>
      </div>
      <div class="nav-links">
        <a href="#product">产品与技术</a>
        <a href="#tech">核心技术</a>
        <a href="#workflow">技术流程</a>
        <a href="#about">关于我们</a>
        <router-link to="/login" class="login-btn">登录</router-link>
      </div>
    </nav>

    <!-- 区域 -->
    <section class="hero fade-in">
      <div class="hero-content">
        <h2>安全、高效、可信的隐私计算解决方案</h2>
        <p>基于多方隐私计算技术，实现数据"可用不可见"</p>
        <div class="cta-buttons">
          <a href="#tech" class="primary-btn">了解技术</a>
          <router-link to="/login" class="secondary-btn">立即体验</router-link>
        </div>
      </div>
    </section>

    <!-- 产品优势 -->
    <section id="product" class="features fade-in">
      <h2>产品优势</h2>
      <div class="feature-grid">
        <div class="feature-card fade-in-scale">
          <div class="feature-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>安全可靠</h3>
          <p class="feature-description">采用先进的加密算法和多方安全计算技术，确保数据在传输、存储和计算过程中的安全性</p>
          <ul class="feature-details">
            <li>支持同态加密、零知识证明等先进加密技术</li>
            <li>实现数据"可用不可见"，保护数据隐私</li>
            <li>通过多方安全计算协议，确保计算过程的安全性</li>
          </ul>
        </div>
        <div class="feature-card fade-in-scale">
          <div class="feature-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <h3>高效计算</h3>
          <p class="feature-description">优化的计算性能和分布式架构，满足大规模数据处理的实时性要求</p>
          <ul class="feature-details">
            <li>支持并行计算，提高处理效率</li>
            <li>优化的加密算法，降低计算开销</li>
            <li>支持分布式部署，实现弹性扩展</li>
          </ul>
        </div>
        <div class="feature-card fade-in-scale">
          <div class="feature-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <h3>多方协作</h3>
          <p class="feature-description">支持多参与方安全计算，打破数据孤岛，实现数据价值最大化</p>
          <ul class="feature-details">
            <li>支持两方及多方安全计算</li>
            <li>灵活的权限控制和数据共享机制</li>
            <li>支持多种数据源接入和标准化处理</li>
          </ul>
        </div>
      </div>
    </section>
        <!-- 核心技术 -->
    <section id="tech" class="tech-section fade-in">
      <h2>核心技术</h2>
      <div class="tech-grid">
        <!-- 安全多方计算模型 -->
        <div class="tech-card fade-in-scale">
          <div class="tech-visual">
            <div class="mpc-flow">
              <div class="participants">
                <i class="fas fa-users" style="font-size:2.2rem;"></i>
              </div>
              <div class="data-stream"></div>
              <div class="compute-core">
                <i class="fas fa-microchip" style="font-size:2.2rem;"></i>
              </div>
            </div>
          </div>
          <div class="tech-content">
            <h3>安全多方计算模型</h3>
            <ul>
              <li>参与方将原始数据通过加密、分割或掩码处理，在交互过程中仅传递经过处理的"非敏感中间值"</li>
              <li>最终通过解密或组合各参与方的部分结果，得到唯一正确的计算输出</li>
              <li>参与方仅知晓必要的输出，无法推断其他方的输入数据</li>
              <li>无需依赖可信第三方，直接在多方间实现安全计算</li>
            </ul>
          </div>
        </div>

        <!-- RSA盲签名 -->
        <div class="tech-card fade-in-scale">
          <div class="tech-visual">
            <div class="blind-sign-flow">
              <div class="message-box">
                <i class="fas fa-envelope"></i>
                <div class="message">原始消息</div>
              </div>
              <div class="arrow-group">
                <i class="fas fa-long-arrow-alt-right"></i>
                <i class="fas fa-mask"></i>
                <i class="fas fa-long-arrow-alt-right"></i>
              </div>
              <div class="signature-box">
                <i class="fas fa-signature"></i>
                <div class="signature">盲签名</div>
              </div>
            </div>
          </div>
          <div class="tech-content">
            <h3>RSA盲签名</h3>
            <ul>
              <li>签名者（Bob）生成RSA公私钥对，请求者（Alice）将待签名消息m乘以随机盲化因子r^e mod n（e为Bob的公钥指数）得到盲化消息m'。</li>
              <li>Bob对m'进行签名得到s'，Alice通过计算s = s'/r mod n得到原始消息m的签名s。整个过程中，Bob无法得知原始消息m的内容，而Alice也无法伪造签名。</li>
              <li>保护消息隐私，签名者无法获知原始消息内容；防止签名被追踪，确保签名者无法将签名与特定请求者关联；</li>
              <li>支持匿名认证，适用于电子投票、数字货币等场景。</li>
            </ul>
          </div>
        </div>

        <!-- 不经意传输 -->
        <div class="tech-card fade-in-scale">
          <div class="tech-visual">
            <div class="ot-flow">
              <div class="sender">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <i class="fas fa-database"></i>
                <div class="data-group">
                  <div class="data-item active">数据1，数据2，数据3</div>
                </div>
              </div>
              <i class="fas fa-exchange-alt"></i>
              <div class="receiver">
                <i class="fas fa-lock-open"></i>
                <div class="result">获取结果</div>
              </div>
            </div>
          </div>
          <div class="tech-content">
            <h3>不经意传输（OT）</h3>
            <ul>
              <li>以 1-out-of-3 OT 为例，Bob 生成一对公私钥，向 Alice 发送公钥。</li>
              <li>Alice 用三个公钥分别加密三条信息并发送给 Bob，Bob 用私钥解密其中一个，另两个因缺乏私钥无法破解。</li>
              <li>整个过程中，Alice 无法确定 Bob 使用了哪条密钥，Bob 也无法推断未选信息的内容。</li>
              <li>严格隔离数据访问权限，防止敏感信息泄露；</li>
              <li>直接在双方间完成安全通信，降低信任风险。</li>
            </ul>
          </div>
        </div>
                <!-- OPRF -->
        <div class="tech-card fade-in-scale">
          <div class="tech-visual">
            <div class="oprf-flow">
              <div class="input">
                <i class="fas fa-keyboard"></i>
                <div class="input-text">输入</div>
              </div>
              <i class="fas fa-arrow-right"></i>
              <div class="function">
                &nbsp;
                <i class="fas fa-calculator"></i>
                <div class="function-text">OPRF</div>
              </div>
              <i class="fas fa-arrow-right"></i>
              <div class="output">
                <i class="fas fa-hashtag"></i>
                <div class="output-text">输出</div>
              </div>
            </div>
          </div>
          <div class="tech-content">
            <h3>OPRF（不经意伪随机函数）</h3>
            <ul>
              <li>以基于椭圆曲线的 OPRF 为例，接收方将输入数据哈希到椭圆曲线点，选择随机数r并发送rA给发送方。</li>
              <li>发送方用密钥s对接收方的盲化数据进行处理，返回s(rA)。接收方通过逆运算r⁻¹(srA)得到PRF(s, x)，而发送方无法推断输入x，接收方也无法获取密钥s。</li>
              <li>该过程依赖离散对数问题的困难性，确保中间结果的不可区分性。</li>
              <li>发送方仅输出结果，无法得知接收方的输入；接收方仅获取目标值，无法逆向推导密钥；作为安全多方计算的基础组件，支撑隐私集合求交（PSI）、联邦学习等复杂协议。</li>
            </ul>
          </div>
        </div>

        <!-- PSI-Payload -->
        <div class="tech-card fade-in-scale">
          <div class="tech-visual">
            <div class="psi-payload-flow">
              <div class="set-a">
                <i class="fas fa-database"></i>
                <div class="set-text">集合A</div>
              </div>
              <i class="fas fa-exchange-alt"></i>
              <div class="payload">
                <i class="fas fa-box"></i>
                <div class="payload-text">载荷</div>
              </div>
              <i class="fas fa-exchange-alt"></i>
              <div class="set-b">
                <i class="fas fa-database"></i>
                <div class="set-text">集合B</div>
              </div>
            </div>
          </div>
          <div class="tech-content">
            <h3>PSI-Payload</h3>
            <ul>
              <li>基于 PSI 协议，参与方通过加密、盲化等操作计算集合交集，确保非交集元素不泄露。 在求交过程中，将与交集元素对应的负载数据通过同态加密、秘密分享或不经意传输等技术进行封装，使其仅与交集元素绑定。 </li>
              <li> 通过协议设计（如 OPRF）将负载数据与交集结果同步传输，接收方仅能解密与交集元素对应的负载，而无法获取其他数据。</li>
              <li>不仅保护集合本身，还确保负载数据仅与交集元素关联。</li>
              <li>避免敏感信息泄露，支持复杂分析需求，如交集元素的加权统计、分类标注等。</li>
            </ul>
          </div>
        </div>

        <!-- 隐私集合求交 -->
        <div class="tech-card fade-in-scale">
          <div class="tech-visual">
            <div class="psi-flow">
              <div class="set-a">
                <i class="fas fa-database"></i>
                <div class="set-text">集合A</div>
              </div>
              <i class="fas fa-exchange-alt"></i>
              <div class="intersection">
                <i class="fas fa-circle"></i>
                <div class="intersection-text">交集</div>
              </div>
              <i class="fas fa-exchange-alt"></i>
              <div class="set-b">
                <i class="fas fa-database"></i>
                <div class="set-text">集合B</div>
              </div>
            </div>
          </div>
          <div class="tech-content">
            <h3>隐私集合求交</h3>
            <ul>
              <li>以双方 PSI 为例，发送方（Alice）对集合元素进行哈希与加密（如加盐哈希、椭圆曲线加密），接收方（Bob）对自身元素添加随机因子 "盲化"（如乘以随机数）。 </li>
              <li>双方通过不经意传输（OT）或密钥交换传递处理后的元素，Bob 利用盲化因子逆运算筛选出与 Alice 数据匹配的交集元素，确保 Alice 无法知晓 Bob 的非交集元素，Bob 仅获取交集而不知 Alice 的完整集合。</li>
              <li>最终双方仅得到交集（或交集大小），非交集信息全程保密。</li>
              <li>参与方仅获知交集，非交集元素及数量完全隐藏，满足 GDPR 等数据合规要求;无需可信第三方，直接在多方间实现安全数据对齐，适用于跨机构数据共享。</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
        <!-- 技术流程 -->
    <section id="workflow" class="workflow fade-in">
      <h2>技术流程</h2>
      <div class="workflow-container">
         <div class="flow-chart">
      <svg :width="svgWidth" :height="svgHeight" class="flow-svg">
        <!-- 添加 defs 定义箭头 -->
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L10,3.5 L0,7 Z" fill="#409EFF" />
          </marker>
          <marker id="curve-arrow" markerWidth="8" markerHeight="8" refX="5" refY="5" orient="auto">
            <path d="M0,0 L5,5 L0,10 L2,5 Z" fill="#67C23A"/>
          </marker>
        </defs>

        <!-- 主体垂直线 -->
        <line x1="150" y1="50" x2="150" y2="800" class="vertical-line" />
        <line x1="625" y1="50" x2="625" y2="800" class="vertical-line" />
        <line x1="1100" y1="50" x2="1100" y2="800" class="vertical-line" />

        <!-- 节点标签 -->
        <text x="100" y="30" class="node-label">数据提供方A</text>
        <text x="575" y="30" class="node-label">数据使用方C</text>
        <text x="1050" y="30" class="node-label">数据提供方B</text>

        <!-- 步骤1：双向箭头 C和B -->
        <g class="step-group">
          <line x1="625" y1="90" x2="1100" y2="90" class="flow-line" marker-end="url(#arrowhead)"/>
          <line x1="1100" y1="90" x2="625" y2="90" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="725" y="80" class="step-text">步骤1: C和B进行密钥协商,数据使用获取公钥</text>
          <text x="825" y="110" class="step-text">pubkey1</text>
        </g>

        <!-- 步骤2 -->
        <g class="step-group">
          <line x1="150" y1="130" x2="625" y2="130" class="flow-line" marker-end="url(#arrowhead)"/>
          <line x1="625" y1="130" x2="150" y2="130" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="250" y="120" class="step-text">步骤2: A和C执行PSI协议，数据使用方获</text>
          <text x="325" y="150" class="step-text">取索引位置</text>
        </g>

        <!-- 步骤3：弯曲箭头 -->
        <g class="step-group">
          <path d="M625,170 Q725,210 625,260" class="curve-arrow" marker-end="url(#curve-arrow)"/>
          <text x="690" y="200" class="step-text">步骤3: C根据真实索引、混淆值，</text>
          <text x="690" y="220" class="step-text">构造混淆索引集合</text>
          <text x="690" y="240" class="step-text">（记住真实索引所在序号t）</text>
        </g>

        <!-- 步骤4 -->
        <g  class="step-group">
          <line x1="625" y1="290" x2="150" y2="290" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="250" y="280" class="step-text">步骤4: 发送混淆索引集合和pubkey1</text>
        </g>

        <!-- 步骤5、6：合并箭头 -->
        <g class="step-group">
          <path d="M150,330 Q50,380 150,440" class="curve-arrow" marker-end="url(#curve-arrow)"/>
          <text x="170" y="345" class="step-text">步骤5: 依据混淆索引集合，构建</text>
          <text x="170" y="365" class="step-text">数据列表T1</text>
          <text x="170" y="400" class="step-text">步骤6: 密钥协商生成公私钥对，</text>
          <text x="170" y="420" class="step-text">用私钥以及pubkey1生成会话密</text>
          <text x="170" y="440" class="step-text">钥使用会话密钥对T1加密得到E1</text>
        </g>

        <!-- 步骤7 -->
        <g  class="step-group">
          <line x1="150" y1="510" x2="625" y2="510" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="275" y="500" class="step-text">步骤7: 发送pubkey2和E1</text>
        </g>

        <!-- 步骤8 -->
        <g  class="step-group">
          <line x1="625" y1="545" x2="1100" y2="545" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="750" y="535" class="step-text">步骤8: 发送pubkey2和E1</text>
        </g>

        <!-- 步骤9、10：合并箭头 -->
        <g  class="step-group">
          <path d="M1100,575 Q1180,615 1100,665" class="curve-arrow" marker-end="url(#curve-arrow)"/>
          <text x="750" y="600" class="step-text">步骤9: B根据自己的私钥privkey1和pubkey2生成</text>
          <text x="750" y="620" class="step-text">会话密钥，解密E1得到T1</text>
          <text x="750" y="660" class="step-text">步骤10: 根据T1列表找到对应信息构建T2</text>
        </g>

        <!-- 步骤11 -->
        <g  class="step-group">
          <line x1="625" y1="750" x2="1100" y2="750" class="flow-line" marker-end="url(#arrowhead)"/>
          <line x1="1100" y1="750" x2="625" y2="750" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="725" y="740" class="step-text">步骤11: C根据序号t执行OT协议，获取</text>
          <text x="750" y="770" class="step-text">数据信息列表T2的第t个数据</text>
        </g>
      </svg>
    </div>
      </div>
    </section>
        <!-- 应用场景 -->
    <section class="use-cases fade-in">
      <h2>应用场景</h2>
      <div class="use-cases-grid">
        <div class="use-case-card fade-in-scale">
          <div class="use-case-icon">
            <i class="fas fa-hospital"></i>
          </div>
          <h3>医疗数据共享</h3>
          <p class="use-case-description">在保护患者隐私的前提下，实现医疗机构间的数据共享和联合分析</p>
          <ul class="use-case-details">
            <li>支持跨机构医疗数据安全共享</li>
            <li>实现患者隐私保护下的疾病研究</li>
            <li>支持医疗资源优化配置</li>
            <li>促进医疗科研合作</li>
          </ul>
        </div>
        <div class="use-case-card fade-in-scale">
          <div class="use-case-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <h3>金融风控</h3>
          <p class="use-case-description">实现金融机构间的数据共享，提升风控能力，同时保护用户隐私</p>
          <ul class="use-case-details">
            <li>支持跨机构信用评估</li>
            <li>实现反洗钱和反欺诈分析</li>
            <li>保护用户金融隐私</li>
            <li>提升风控模型准确性</li>
          </ul>
        </div>
        <div class="use-case-card fade-in-scale">
          <div class="use-case-icon">
            <i class="fas fa-building"></i>
          </div>
          <h3>政务数据共享</h3>
          <p class="use-case-description">促进政府部门间的数据共享，提高政务效率，保护公民隐私</p>
          <ul class="use-case-details">
            <li>支持跨部门数据安全共享</li>
            <li>实现政务数据价值挖掘</li>
            <li>保护公民隐私信息</li>
            <li>提升政务服务效率</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section id="about" class="about fade-in">
      <h2>关于我们</h2>
      <div class="about-content">
        <p>我们致力于提供创新型的隐私计算解决方案，帮助机构在保护数据隐私的同时实现数据价值。目前，我们已与所在高校和附属医院建立了合作关系，共同推动隐私计算技术在教育、医疗等领域的应用。</p>
        <div class="partners">
          <div class="partner-item">
            <i class="fas fa-university"></i>
            <span>XX大学</span>
          </div>
          <div class="partner-item">
            <i class="fas fa-hospital"></i>
            <span>XX医院</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentStep = ref(1)
const svgWidth = ref(1200)
const svgHeight = ref(800)

const nextStep = () => {
  if (currentStep.value < 11) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

onMounted(() => {
  // 创建 IntersectionObserver 实例
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
        // 如果是卡片容器，为其中的卡片添加延迟动画
        if (entry.target.classList.contains('feature-grid') ||
            entry.target.classList.contains('tech-grid') ||
            entry.target.classList.contains('use-cases-grid')) {
          const cards = entry.target.querySelectorAll('.fade-in-scale')
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate')
            }, index * 20) // 每个卡片延迟200ms
          })
        }
        observer.unobserve(entry.target) // 只触发一次动画
      }
    })
  }, {
    threshold: 0.1, // 当元素10%进入视口时触发
    rootMargin: '0px 0px -100px 0px' // 提前100px触发
  })

  // 观察所有需要动画的元素
  document.querySelectorAll('.fade-in, .fade-in-scale').forEach(el => {
    observer.observe(el)
  })
})
</script>
<style scoped>
/* 添加新的动画关键帧 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 添加淡入动画类 */
.fade-in {
  opacity: 0;
  transform: translateY(40px);
  transition: none;
}

.fade-in.animate {
  animation: fadeIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.fade-in-scale {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
  transition: none;
}

.fade-in-scale.animate {
  animation: fadeInScale 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

/* 为不同区域添加动画延迟 */
#product.fade-in.animate { animation-delay: 0.2s; }
#tech.fade-in.animate { animation-delay: 0.4s; }
#workflow.fade-in.animate { animation-delay: 0.4s; }
.use-cases.fade-in.animate { animation-delay: 0.4s; }
#about.fade-in.animate { animation-delay: 0.4s; }

.landing-page {
  font-family: 'Arial', sans-serif;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.logo h1 {
  font-size: 1.5rem;
  color: #333;
  transition: transform 0.3s ease;
}

.logo h1:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #0066cc;
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.login-btn {
  background: #0066cc;
  color: white !important;
  padding: 0.8rem 2.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 102, 204, 0.2);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  min-width: 120px;
  text-align: center;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);
  background: #0052a3;
  padding: 0.8rem 2.7rem;
}

.hero {
  height: 100vh;
  background: linear-gradient(-45deg, #0066cc, #004d99, #003366, #004d99);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 1rem;
  position: relative;
  overflow: hidden;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-content {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: 0.5s;
}

.hero-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.primary-btn, .secondary-btn {
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.primary-btn {
  background: white;
  color: #0066cc;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.secondary-btn {
  background: transparent;
  color: white;
  border: 2px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.primary-btn:hover, .secondary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.primary-btn::after, .secondary-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.primary-btn:hover::after, .secondary-btn:hover::after {
  width: 300px;
  height: 300px;
}

.features, .tech-section, .workflow, .use-cases, .about {
  padding: 5rem 10%;
}

.features h2, .tech-section h2, .workflow h2, .use-cases h2, .about h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
}

.feature-card.animate {
  transform: translateY(0);
  opacity: 1;
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: #0066cc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.feature-icon i {
  font-size: 2.5rem;
  color: white;
}

.feature-description {
  font-size: 1.1rem;
  color: #666;
  margin: 1rem 0;
  line-height: 1.6;
}

.feature-details {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  text-align: left;
}

.feature-details li {
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
}

.feature-details li:before {
  content: "•";
  color: #0066cc;
  position: absolute;
  left: 0;
}

.tech-section {
  padding: 5rem 10%;
  background: #f8f9fa;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.tech-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
}

.tech-card.animate {
  transform: translateY(0);
  opacity: 1;
}

.tech-visual {
  padding: 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 让流程水平排列 */
.mpc-flow, .blind-sign-flow, .ot-flow, .oprf-flow, .psi-payload-flow, .psi-flow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
}

.tech-visual i {
  font-size: 1.7rem;
  color: #0066cc;
  margin: 0 0.2rem;
}

.tech-visual .data-stream {
  width: 40px;
  height: 3px;
  background: #0066cc;
  margin: 0 0.2rem;
}

.tech-visual .node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.tech-visual .node i {
  font-size: 1.2rem;
}

/* OPRF等流程的文字在图标下方，保持紧凑 */
.oprf-flow .input-text,
.oprf-flow .function-text,
.oprf-flow .output-text,
.psi-payload-flow .set-text,
.psi-payload-flow .payload-text,
.psi-flow .set-text,
.psi-flow .intersection-text {
  font-size: 0.9rem;
  color: #0066cc;
  margin-top: 0.2rem;
  text-align: center;
}

.tech-content {
  padding: 2rem;
}

.tech-content h3 {
  color: #0066cc;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.tech-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-content li {
  padding: 0.8rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.6;
}

.tech-content li:before {
  content: "•";
  color: #0066cc;
  position: absolute;
  left: 0;
}

.workflow-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 3rem;
}

.flow-chart {
  width: 100%;
  overflow-x: auto;
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}

.flow-svg {
  min-width: 1200px;
}

.curve-arrow {
  fill: none;
  stroke: #67C23A;
  stroke-width: 2;
  stroke-dasharray: 5;
  animation: flow 1s linear infinite;
}

.vertical-line {
  stroke: #0066cc;
  stroke-width: 2;
  stroke-dasharray: 5,5;
}

.flow-line {
  stroke: #0066cc;
  stroke-width: 2;
}

.node-label {
  font-size: 1.2rem;
  font-weight: bold;
  fill: #333;
}

.step-text {
  font-size: 1rem;
  fill: #666;
}

.workflow-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.workflow-controls button {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  background: #0066cc;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.workflow-controls button:hover {
  background: #004d99;
}

.workflow-controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.use-cases {
  padding: 5rem 10%;
  background: #f8f9fa;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.use-case-card {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
}

.use-case-card.animate {
  transform: translateY(0);
  opacity: 1;
}

.use-case-icon {
  width: 80px;
  height: 80px;
  background: #0066cc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.use-case-icon i {
  font-size: 2.5rem;
  color: white;
}

.use-case-description {
  font-size: 1.1rem;
  color: #666;
  margin: 1rem 0;
  line-height: 1.6;
}

.use-case-details {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  text-align: left;
}

.use-case-details li {
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
}

.use-case-details li:before {
  content: "•";
  color: #0066cc;
  position: absolute;
  left: 0;
}

.team-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #0066cc;
}

.stat-label {
  color: #666;
  font-size: 1.1rem;
}

/* 技术原理样式 */
.tech-principle {
  padding: 5rem 10%;
  background: #f8f9fa;
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.principle-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
}

.principle-card.animate {
  transform: translateY(0);
  opacity: 1;
}

.principle-visual {
  padding: 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.principle-content {
  padding: 2rem;
}

.principle-content h3 {
  color: #0066cc;
  margin-bottom: 1rem;
}

.principle-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.principle-content li {
  padding: 0.5rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
}

.principle-content li:before {
  content: "•";
  color: #0066cc;
  position: absolute;
  left: 0;
}

/* 动画效果 */
.mpc-flow, .blind-sign-flow, .ot-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  animation: fadeIn 1s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .flow-chart {
    padding: 1rem;
  }

  .principle-grid {
    grid-template-columns: 1fr;
  }
}

/* 关于我们样式优化 */
.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-content p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 3rem;
}

.partners {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.partner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.partner-item i {
  font-size: 3rem;
  color: #0066cc;
}

.partner-item span {
  font-size: 1.2rem;
  color: #333;
}

@media (max-width: 768px) {
  .feature-card, .tech-card, .use-case-card {
    padding: 2rem;
  }

  .partners {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>