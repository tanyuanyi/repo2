<template>
    <div>
        <my-form ref="demo"></my-form>
        <el-button type="primary" plain @click="dialogVisible = true">添加信息</el-button>
        <el-button type="danger" plain :disabled="selectionData.length == 0" @click="delAll()">批量删除</el-button>
        <el-table :data="tableData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="案例名称" prop="title"></el-table-column>
            <el-table-column label="案例类别" prop="sortname"></el-table-column>
            <el-table-column label="案例内容" prop="content" show-overflow-tooltip></el-table-column>
            <el-table-column label="添加时间" prop="time">
                <template #default="scope">
                    {{ scope.row.time | fomrtDate }}
                </template>
            </el-table-column>
            <el-table-column label="图片" prop="pic">
                <template #default="scope">
                    <img v-if="scope.row.pic" :src="'http://www.ggqapi.com/upload/' + scope.row.pic" height="50"
                        @click="picShow(scope.row.pic)">
                </template>
            </el-table-column>
            <el-table-column label="案例内容" prop="content"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 图片预览 -->
        <el-dialog :visible.sync="lookdialogVisible" :modal="false" title="图片预览" width="60%">
            <img :src="'http://www.ggqapi.com/upload/' + previewPic" width="100%" />
        </el-dialog>
        <div class="block" style="text-align: center;">
            <el-pagination layout="total ,prev, pager, next, jumper" :total="Number(total)" @current-change="pageChange">
            </el-pagination>
        </div>
        <!-- 对话框begin -->
        <el-dialog :title="ruleForm.id ? '编辑案例' : '添加案例'" width="90%" :visible.sync="dialogVisible" @close="close()"
            :before-close="handleClose">
            <el-form label-width="80px" ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-form-item label="案例名称" prop="title">
                    {{ ruleForm.title }}
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="案例类别" prop="sortid">
                    <el-select v-model="ruleForm.sortid" placeholder="请选择案例类别">
                        <el-option value="" label="请选择案例类别"></el-option>
                        <el-option v-for="item in sortclass" :value="item.id" :label="item.sortname"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="案例内容" prop="content">
                    <el-input type="textarea" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <el-form-item labrl="图片" prop="pic">
                    <el-upload class="avatar-uploader" action="http://www.ggqapi.com/api/upload.php" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="添加时间" prop="time">
                    {{ ruleForm.time }}
                    <el-date-picker v-model="ruleForm.time" type="datetime" value-format="timestamp"
                        placeholder="选择添加时间"></el-date-picker>
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
            ruleForm: {},
            rules: {
                title: [{ required: true, message: '请填写案例名称', trigger: 'blur' }],
                sortid: [{ required: true, message: '请选择案例类别', trigger: 'change' }],
                content: [{ required: true, message: '请填写案例内容', trigger: 'blur' }],
                time: [{ required: true, message: '请填写添加时间', trigger: 'blur' }]
            },
            selectionData: [],//选中的多条数据
            imageUrl: "",//图片地址
            previewPic: "",
            lookdialogVisible: false,
            sortid:[
                {
                    value: 1,
                    label: "活动墙系列"
                },
                {
                    value: 2,
                    label: "活动系列"
                },
            ]
        }
    },
    methods: {
        pageChange(page) {
            this.page = page
            this.getData()
        },
        //获取表单
        getData() {
            axios({
                url: 'http://www.ggqapi.com/api/index.php?table=cases',
                params: { page: this.page }
            }).then(res => {
                this.tableData = res.data
                this.total = res.count
                console.log(this.tableData);
            })
        },
        //获取类别
        getSort() {
            axios({
                url: 'http://www.ggqapi.com/api/index.php?table=sortclass where parentid = 25',
            }).then(res => {
                this.sortclass = res.data
            })
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
                url: 'http://www.ggqapi.com/api/save.php?table=cases',
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
                url: 'http://www.ggqapi.com/api/detail.php?table=cases',
                params: { id: id }
            }).then(res => {
                res.data.time = res.data.time * 1000
                if (res.data.pic) {
                    this.imageUrl = 'http://www.ggqapi.com/upload/' + res.data.pic
                }
                this.ruleForm = res.data
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
                url: 'http://www.ggqapi.com/api/del.php?table=cases',
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
        //多选删除
        delAll() {
            let id = this.selectionData.map(item => item.id)
            this.bfdel(id.join())
        },
        //复选框改变时执行的函数
        handleSelectionChange(d) {
            this.selectionData = d
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //图片验证
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 或 PNG格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //图片预览
        picShow(url) {
            this.previewPic = url;
            this.lookdialogVisible = true;
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
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
