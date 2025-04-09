<template>
  <div class="principle-container">
    <div class="section-title">
      <h3>隐私计算流程</h3>
    </div>
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
        <line x1="200" y1="50" x2="200" y2="750" class="vertical-line" />
        <line x1="600" y1="50" x2="600" y2="750" class="vertical-line" />
        <line x1="1000" y1="50" x2="1000" y2="750" class="vertical-line" />

        <!-- 节点标签 -->
        <text x="200" y="30" class="node-label">数据提供方A</text>
        <text x="600" y="30" class="node-label">数据使用方C</text>
        <text x="1000" y="30" class="node-label">数据提供方B</text>

        <!-- 步骤1：双向箭头 C和B -->
        <g v-if="currentStep >= 1" class="step-group">
          <line x1="600" y1="90" x2="1000" y2="90" class="flow-line" marker-end="url(#arrowhead)"/>
          <line x1="1000" y1="90" x2="600" y2="90" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="800" y="80" class="step-text">步骤1: C和B进行密钥协商,数据使用获取公钥</text>
          <text x="800" y="110" class="step-text">pubkey1</text>
        </g>

        <!-- 步骤2 -->
        <g v-if="currentStep >= 2" class="step-group">
          <line x1="200" y1="130" x2="600" y2="130" class="flow-line" marker-end="url(#arrowhead)"/>
          <line x1="600" y1="130" x2="200" y2="130" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="400" y="120" class="step-text">步骤2: A和C执行PSI协议，数据使用方获</text>
          <text x="400" y="150" class="step-text">取索引位置</text>
        </g>

        <!-- 步骤3：弯曲箭头 -->
        <g v-if="currentStep >= 3" class="step-group">
          <path d="M600,170 Q700,210 600,260" class="curve-arrow" marker-end="url(#curve-arrow)"/>
          <text x="500" y="200" class="step-text">步骤3: C根据真实索引、混淆值，</text>
          <text x="500" y="220" class="step-text">构造混淆索引集合</text>
          <text x="500" y="240" class="step-text">（记住真实索引所在序号t）</text>
        </g>

        <!-- 步骤4 -->
        <g v-if="currentStep >= 4" class="step-group">
          <line x1="600" y1="290" x2="200" y2="290" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="400" y="280" class="step-text">步骤4: 发送混淆索引集合和pubkey1</text>
        </g>

        <!-- 步骤5、6：合并箭头 -->
        <g v-if="currentStep >= 5" class="step-group">
          <path d="M200,320 Q100,370 200,430" class="curve-arrow" marker-end="url(#curve-arrow)"/>
          <text x="300" y="335" class="step-text">步骤5: 依据混淆索引集合，构建</text>
          <text x="300" y="355" class="step-text">数据列表T1</text>
          <text x="300" y="390" class="step-text">步骤6: 密钥协商生成公私钥对，</text>
          <text x="300" y="410" class="step-text">用私钥以及pubkey1生成会话密</text>
          <text x="300" y="430" class="step-text">钥使用会话密钥对T1加密得到E1</text>
        </g>

        <!-- 步骤7 -->
        <g v-if="currentStep >= 7" class="step-group">
          <line x1="200" y1="480" x2="600" y2="480" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="400" y="470" class="step-text">步骤7: 发送pubkey2和E1</text>
        </g>

        <!-- 步骤8 -->
        <g v-if="currentStep >= 8" class="step-group">
          <line x1="600" y1="525" x2="1000" y2="525" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="800" y="515" class="step-text">步骤8: 发送pubkey2和E1</text>
        </g>

        <!-- 步骤9、10：合并箭头 -->
        <g v-if="currentStep >= 9" class="step-group">
          <path d="M1000,555 Q1080,595 1000,645" class="curve-arrow" marker-end="url(#curve-arrow)"/>
          <text x="850" y="580" class="step-text">步骤9: B根据自己的私钥privkey1和pubkey2生成</text>
          <text x="850" y="600" class="step-text">会话密钥，解密E1得到T1</text>
          <text x="850" y="640" class="step-text">步骤10: 根据T1列表找到对应信息构建T2</text>
        </g>

        <!-- 步骤11 -->
        <g v-if="currentStep >= 11" class="step-group">
          <line x1="600" y1="700" x2="1000" y2="700" class="flow-line" marker-end="url(#arrowhead)"/>
          <line x1="1000" y1="700" x2="600" y2="700" class="flow-line" marker-end="url(#arrowhead)"/>
          <text x="800" y="690" class="step-text">步骤11: C根据序号t执行OT协议，获取</text>
          <text x="800" y="720" class="step-text">数据信息列表T2的第t个数据</text>
        </g>
      </svg>
    </div>

    <div class="control-panel">
      <div class="button-group">
        <!-- 初始状态只显示重置和开始按钮 -->
        <template v-if="currentStep === 0">
          <button
            @click="resetSteps"
            class="control-button warning"
          >重置</button>
          <button
            @click="startFlow"
            class="control-button primary"
          >开始</button>
        </template>

        <!-- 开始后显示上一步、重置、下一步按钮 -->
        <template v-else>
          <button
            @click="prevStep"
            :disabled="currentStep === 0"
            class="control-button"
          >上一步</button>
          <button
            @click="resetSteps"
            class="control-button warning"
          >重置</button>
          <button
            @click="nextStep"
            :disabled="currentStep === 11"
            class="control-button"
          >下一步</button>
        </template>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'PrincipleView',
  data() {
    return {
      currentStep: 0,
      svgWidth: 1200,
      svgHeight: 800
    }
  },
  methods: {
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    nextStep() {
      if (this.currentStep < 11) {
        this.currentStep++
      }
    },
    resetSteps() {
      this.currentStep = 0
    },
    startFlow() {
      this.currentStep = 1
    }
  }
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
  margin: 0px auto 1px;
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

.flow-chart {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.flow-svg {
  display: block;
  margin: 0 auto;
  width: 1200px;
  height: 750px;

}

.vertical-line {
  stroke: #409EFF;
  stroke-width: 2;
  stroke-dasharray: 5,5;
}

.flow-line {
  stroke: #409EFF;
  stroke-width: 2;
}

.step-group {
  transition: all 0.3s ease;
}

.step-text {
  font-size: 14px;
  fill: #606266;
  text-anchor: middle;
}

.node-label {
  font-size: 16px;
  font-weight: bold;
  fill: #303133;
  text-anchor: middle;
}

.curve-arrow {
  fill: none;
  stroke: #67C23A;
  stroke-width: 2;
  stroke-dasharray: 5;
  animation: flow 1s linear infinite;
}

@keyframes flow {
  from { stroke-dashoffset: 10; }
  to { stroke-dashoffset: 0; }
}

.control-panel {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.control-button {
  min-width: 100px;
  padding: 10px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: white;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.control-button:hover:not(:disabled) {
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.control-button:disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.control-button.primary {
  background-color: #409EFF;
  border-color: #409EFF;
  color: white;
}

.control-button.primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
  color: white;
}

/* 警示按钮样式 */
.control-button.warning {
  background-color: #fef0f0;
  border-color: #fbc4c4;
  color: #f56c6c;
}

.control-button.warning:hover {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
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


@media (max-width: 768px) {
  .tech-content li {
    font-size: 13px;
  }
}


</style>