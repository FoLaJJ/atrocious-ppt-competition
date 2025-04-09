<template>
  <div class="principle-container">
     <div class="section-title">
      <h3>技术原理</h3>
    </div>

    <div class="principle-section">
      <div class="principle-columns">

      <!-- 新增：安全多方计算模型 -->
      <div class="tech-card">
        <div class="visual-box">
          <div class="mpc-flow">
            <div class="participants">
              <div v-for="i in 3" :key="i" class="node">
                <i class="fas fa-user-shield"></i>
                <div class="data-stream"></div>
              </div>
            </div>
            <div class="compute-core">
              <i class="fas fa-brain"></i>
            </div>
          </div>
        </div>
        <div class="tech-content">
          <h4>安全多方计算模型</h4>
          <ul>
            <li>参与方将原始数据通过加密、分割或掩码处理（如混淆电路、同态加密等技术），在交互过程中仅传递经过处理的 "非敏感中间值"，最终通过解密或组合各参与方的部分结果，得到唯一正确的计算输出。</li>
            <li>参与方仅知晓必要的输出，无法推断其他方的输入数据;无需依赖可信第三方，直接在多方间实现安全计算。</li>
          </ul>
        </div>
      </div>

       <!-- 新增：RSA盲签名 -->
      <div class="tech-card">
          <div class="visual-box">
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
            <h4>RSA盲签名</h4>
            <ul>
              <li>以RSA盲签名为例，签名者（Bob）生成RSA公私钥对，请求者（Alice）将待签名消息m乘以随机盲化因子r^e mod n（e为Bob的公钥指数）得到盲化消息m'。Bob对m'进行签名得到s'，Alice通过计算s = s'/r mod n得到原始消息m的签名s。整个过程中，Bob无法得知原始消息m的内容，而Alice也无法伪造签名。</li>
              <li>保护消息隐私，签名者无法获知原始消息内容；防止签名被追踪，确保签名者无法将签名与特定请求者关联；支持匿名认证，适用于电子投票、数字货币等场景。</li>
            </ul>
          </div>
        </div>

      <!-- 不经意传输 -->
      <div class="tech-card">
          <div class="visual-box">
            <div class="ot-flow">
              <div class="sender">
                <i class="fas fa-database"></i>
                <div class="data-group">
                  <div class="data-item">数据1</div>
                  <div class="data-item active">数据2</div>
                  <div class="data-item">数据3</div>
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
            <h4>不经意传输（OT）</h4>
            <ul>
              <li>以 1-out-of-3 OT 为例，Bob 生成一对公私钥，向 Alice 发送公钥。Alice 用三个公钥分别加密三条信息并发送给 Bob，Bob 用私钥解密其中一个，另两个因缺乏私钥无法破解。整个过程中，Alice 无法确定 Bob 使用了哪条密钥，Bob 也无法推断未选信息的内容。</li>
              <li>严格隔离数据访问权限，防止敏感信息泄露；直接在双方间完成安全通信，降低信任风险。
</li>
            </ul>
          </div>
        </div>

      <!-- OPRF -->
      <div class="tech-card">
          <div class="visual-box">
            <div class="oprf-flow">
              <div class="key-box">
                <i class="fas fa-key"></i>
                <span>密钥</span>
              </div>
              <div class="arrow-group">
                <i class="fas fa-long-arrow-alt-right"></i>
                <i class="fas fa-function"></i>
                <i class="fas fa-long-arrow-alt-right"></i>
              </div>
              <div class="result-box">
                <i class="fas fa-shield-alt"></i>
                <span>加密结果</span>
              </div>
            </div>
          </div>
          <div class="tech-content">
            <h4>OPRF协议</h4>
            <ul>
              <li>以基于椭圆曲线的 OPRF 为例，接收方将输入数据哈希到椭圆曲线点，选择随机数r并发送rA给发送方。发送方用密钥s对接收方的盲化数据进行处理，返回s(rA)。接收方通过逆运算r⁻¹(srA)得到PRF(s, x)，而发送方无法推断输入x，接收方也无法获取密钥s。该过程依赖离散对数问题的困难性，确保中间结果的不可区分性。</li>
              <li>发送方仅输出结果，无法得知接收方的输入；接收方仅获取目标值，无法逆向推导密钥；作为安全多方计算的基础组件，支撑隐私集合求交（PSI）、联邦学习等复杂协议。</li>
            </ul>
          </div>
        </div>


      <!-- 新增：PSI-Payload -->
      <div class="tech-card">
        <div class="visual-box">
          <div class="psi-payload-flow">
            <div class="sets">
              <div class="set-a">
                <div class="element" v-for="i in 3" :key="i">
                  <span>数据{{i}}</span>
                  <div class="payload">元数据</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tech-content">
          <h4>PSI-Payload</h4>
          <ul>
            <li>基于 PSI 协议，参与方通过加密、盲化等操作计算集合交集，确保非交集元素不泄露。 在求交过程中，将与交集元素对应的负载数据通过同态加密、秘密分享或不经意传输等技术进行封装，使其仅与交集元素绑定。 通过协议设计（如 OPRF）将负载数据与交集结果同步传输，接收方仅能解密与交集元素对应的负载，而无法获取其他数据。</li>
            <li>不仅保护集合本身，还确保负载数据仅与交集元素关联，避免敏感信息泄露;支持复杂分析需求，如交集元素的加权统计、分类标注等。</li>
          </ul>
        </div>
      </div>

      <!-- 新增：隐私集合求交 -->
      <div class="tech-card">
        <div class="visual-box">
          <div class="psi-flow">
            <div class="venn-diagram">
              <div class="circle left">
                <span>集合A</span>
                <div class="element">X</div>
                <div class="element">Y</div>
              </div>
              <div class="circle right">
                <span>集合B</span>
                <div class="element">Y</div>
                <div class="element">Z</div>
              </div>
              <div class="intersection">
                <span>Y</span>
                <i class="fas fa-eye-slash"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="tech-content">
          <h4>隐私集合求交</h4>
          <ul>
            <li>以双方 PSI 为例，发送方（Alice）对集合元素进行哈希与加密（如加盐哈希、椭圆曲线加密），接收方（Bob）对自身元素添加随机因子 "盲化"（如乘以随机数）。 双方通过不经意传输（OT）或密钥交换传递处理后的元素，Bob 利用盲化因子逆运算筛选出与 Alice 数据匹配的交集元素，确保 Alice 无法知晓 Bob 的非交集元素，Bob 仅获取交集而不知 Alice 的完整集合。 最终双方仅得到交集（或交集大小），非交集信息全程保密。</li>
            <li>参与方仅获知交集，非交集元素及数量完全隐藏，满足 GDPR 等数据合规要求;无需可信第三方，直接在多方间实现安全数据对齐，适用于跨机构数据共享。</li>
          </ul>
        </div>
          </div>



      </div>


    </div>
  </div>

</template>

<script>
export default {
  name: 'PrincipleSectionView',
}
</script>

<style scoped>
.principle-container {
  padding: 0px;
  background-color: #f5f7fa;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.section-title {
  width: 100%;
  max-width: 1200px;
  margin: 0px auto 2px;
  text-align: center;
}

.section-title h3 {
  display: inline-block;  /* 保持下划线长度自适应 */
  font-size: 18px;
  color: #303133;
  font-weight: 600;
  margin: 0;
  padding: 0 15px 8px;  /* 下边距留给下划线 */
  position: relative;
}

.section-title h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #409EFF;
  transform: scaleX(0.8);  /* 控制下划线长度为文本的80% */
}


@keyframes flow {
  from { stroke-dashoffset: 10; }
  to { stroke-dashoffset: 0; }
}


.principle-section {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.principle-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.tech-card {
  min-height: 220px;
  display: flex;
  flex-direction: column;
}

.tech-card:hover {
  transform: translateY(-5px);
}

.visual-box {
  padding: 20px;
  background: linear-gradient(135deg, #f1f5ff, #ffffff);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.tech-content h4 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #2c3e50;
  text-align: center;
}

.tech-content ul {
  flex: 1;
  margin: 0;
  padding: 0 15px;
  list-style: none;
}

.tech-content li {
  position: relative;
  padding: 8px 0 8px 25px;
  line-height: 1.5;
  font-size: 14px;
  color: #606266;
}

.tech-content li::before {
  content: "•";
  color: #409EFF;
  position: absolute;
  left: 0;
  font-size: 16px;
}

/* 图形化样式 */
.ot-flow {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sender, .receiver {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.data-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.data-item {
  padding: 6px 12px;
  background: #ebf5ff;
  border-radius: 15px;
  font-size: 12px;
}

.data-item.active {
  background: #409EFF;
  color: white;
}

.oprf-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.key-box, .result-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #f0f9eb;
  border-radius: 20px;
}

.mpc-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 180px;
}

.participants {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.node {
  position: relative;
  text-align: center;
}

.data-stream {
  width: 2px;
  height: 40px;
  background: #409EFF;
  margin: 10px auto;
  position: relative;
}

.data-stream::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: -4px;
  width: 10px;
  height: 10px;
  background: #67C23A;
  border-radius: 50%;
}

.compute-core {
  width: 50px;
  height: 50px;
  background: #f0f9eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* PSI-Payload图形 */
.psi-payload-flow {
  display: flex;
  justify-content: center;
  height: 180px;
}

.sets {
  display: flex;
  align-items: center;
  gap: 30px;
}

.set-a {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.element {
  position: relative;
  padding: 8px;
  background: #ebf5ff;
  border-radius: 6px;
}

.payload {
  position: absolute;
  right: -15px;
  bottom: -8px;
  padding: 3px 6px;
  background: #fdf6ec;
  border-radius: 4px;
  font-size: 12px;
}

/* 隐私集合求交图形 */
.psi-flow {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.venn-diagram {
  position: relative;
  width: 200px;
  height: 120px;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  opacity: 0.2;
}

.left {
  background: #ebf5ff;
  left: 0;
}

.right {
  background: #f0f9eb;
  right: 0;
}

.intersection {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #409EFF;
}

/* 统一图标样式 */
.fa-user-shield { color: #67C23A; }
.fa-brain { color: #E6A23C; }
.fa-handshake { color: #409EFF; }
.fa-eye-slash { color: #f56c6c; }

/* 响应式优化 */
@media (max-width: 1200px) {
  .principle-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .tech-card {
    min-height: auto;
  }
  .tech-content li {
    font-size: 13px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .principle-columns {
    grid-template-columns: 1fr;
  }

  .visual-box {
    min-height: 150px;
  }
}

/* 图标样式 */
.fa-exchange-alt,
.fa-long-arrow-alt-right,
.fa-database,
.fa-lock-open {
  color: #67C23A;
  font-size: 28px;
}

/* RSA盲签名图形 */
.blind-sign-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  height: 180px;
  background: linear-gradient(135deg, #f1f5ff, #ffffff);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.message-box, .signature-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: #f0f9eb;
  border-radius: 20px;
}

.arrow-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.fa-mask {
  color: #E6A23C;
  font-size: 24px;
}

.fa-envelope, .fa-signature {
  color: #409EFF;
  font-size: 24px;
}

</style>