<template>
    <div>
        <my-form ref="demo"></my-form>
        <el-button type="primary" plain @click="dialogVisible = true">添加</el-button>
        <el-button type="danger" :disabled="selectionData.length == 0" plain @click="delAll()">批量删除</el-button>
        <el-table :data="tableData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="服务标题" prop="title"></el-table-column>
            <el-table-column label="服务类别" prop="sortname"></el-table-column>
            <el-table-column label="服务内容" prop="content" show-overflow-tooltip></el-table-column>
            <el-table-column label="添加时间" prop="time">
                <template #default="scope">
                    {{ scope.row.time | fomrtDate }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="bfdel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="text-align: center;">
            <el-pagination layout="total ,prev, pager, next, jumper" :total="Number(total)" @current-change="pageChange">
            </el-pagination>
        </div>
        <!-- 对话框begin -->
        <el-dialog :title="ruleForm.id ? '编辑标题' : '添加标题'" width="90%" :visible.sync="dialogVisible" @close="close()"
            :before-close="handleClose">
            <el-form label-width="80px" ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-form-item label="服务标题" prop="title">
                    {{ ruleForm.title }}
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="服务内容" prop="content">
                    <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item label="添加时间" prop="time">
                    {{ ruleForm.time }}
                    <el-date-picker v-model="ruleForm.time" type="datetime" placeholder="选择日期时间" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 对话框end -->
    </div>
</template>
<script>
import axios from "@/utils/request";
import MyForm from '@/components/MyForm.vue'
import qs from 'qs'
export default {
    data() {
        return {
            tableData: [],
            sortclass: [],//类别
            page: 1,
            total: "",//当前页码
            dialogVisible: false,
            ruleForm: {},//表单数据
            selectionData: [],//选中的多条数据
            rules: {
                title: [{ required: true, message: '请填写服务标题', trigger: 'blur' }],
                // sortid: [{ required: true, message: '请选择新闻类别', trigger: 'change' }],
                // content: [{ required: true, message: '请填写新闻内容', trigger: 'blur' }],
                time: [{ required: true, message: '请填写添加时间', trigger: 'blur' }]
            },
        }
    },
    methods: {
        //翻页
        pageChange(page) {
            this.page = page
            this.getData()
        },
        //获取表单
        getData() {
            axios({
                url: 'index.php?table=enterpriseservice',
                params: { page: this.page }
            }).then(res => {
                this.tableData = res.data
                this.total = res.count
                console.log(this.tableData);
            })
        },
        //获取类别
        // getSort() {
        //     axios({
        //         url: 'index.php?table=sortclass where parentid = 60',
        //     }).then(res => {
        //         this.sortclass = res.data
        //     })
        // },
        //关闭
        close() {
            this.ruleForm = {}
            this.imageUrl = ""
            this.$refs["ruleForm"].resetFields();
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        //提交表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.save()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //保存
        save() {
            console.log(this.ruleForm)
            this.ruleForm.time = this.ruleForm.time / 1000
            const data = qs.stringify(this.ruleForm)
            axios({
                method: 'post',
                url: 'save.php?table=enterpriseservice',
                data: data
            }).then(res => {
                this.$message.success('操作成功')
                this.dialogVisible = false
                this.getData()
            })
        },
        //编辑
        edit(id) {
            axios({
                url: 'detail.php?table=enterpriseservice',
                params: { id: id }
            }).then(res => {
                res.data.time = res.data.time * 1000
                //给表单赋值
                this.ruleForm = res.data
                //显示对话框
                this.dialogVisible = true
            })
        },
        //是否删除
        bfdel(id) {
            this.$confirm("您确定要删除吗？")
                .then(() => {
                    this.del(id)
                }).catch(() => {
                    console.log("已取消");
                })
        },
        //删除
        del(id) {
            axios({
                url: 'del.php?table=enterpriseservice',
                params: { id: id }
            }).then(res => {
                if (res.code == 0) {
                    this.$message.success('删除成功')
                    this.getData()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        //复选框改变时执行的函数
        handleSelectionChange(d) {
            this.selectionData = d
        },
        //批量删除
        delAll() {
            let id = this.selectionData.map(item => item.id)
            this.bfdel(id.join())
        }
    },
    mounted() {
        this.getData()
        this.getSort()
    },
    components: {
        'my-form': MyForm
    }
}
</script>
