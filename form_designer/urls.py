from django.conf.urls.defaults import patterns, url

NAME_RE = '[:\-_\w]+'

urlpatterns = patterns('',
    url(r'^(?P<object_name>%s)/$' % NAME_RE, 'form_designer.views.detail', name='form_designer_detail'),
    url(r'^h/(?P<public_hash>%s)/$' % NAME_RE, 'form_designer.views.detail_by_hash', name='form_designer_detail_by_hash'),
    url(r'^edit/(?P<object_name>%s)/$' % NAME_RE, 'form_designer.views.edit', name='form_designer_edit'),
    url(r'^edit/h/(?P<public_hash>%s)/$' % NAME_RE, 'form_designer.views.edit_by_hash', name='form_designer_edit_by_hash'),
    url(r'^save/(?P<object_name>%s)/$' % NAME_RE, 'form_designer.views.save', name='form_designer_save'),
)
