use ExtUtils::MakeMaker;
use YAML;

my $config = YAML::LoadFile((glob('./plugins/*/config.yaml'))[0]);

WriteMakefile(
    NAME     => $config->{name},
    VERSION  => $config->{version},
    SKIP     => [qw(distdir)],
    DISTNAME => $config->{name},
);

sub MY::top_targets {
    << 'Makefile';
build:
	npm run build
	mkdir -p mt-static/plugins/MTBlockEditor/locales
	for f in plugins/MTBlockEditor/lib/MT/Plugin/MTBlockEditor/L10N/*.pm; do \
        l=$$(basename $$f .pm); \
        d=mt-static/plugins/MTBlockEditor/locales/$${l}.js; \
        \
        echo '(function() { var lexicon =' > $$d; \
        perl -Iplugins/MTBlockEditor/lib -I$$MT_HOME/lib -MMT::Plugin::MTBlockEditor::L10N::$$l -MJSON::XS -e "print(encode_json(\%MT::Plugin::MTBlockEditor::L10N::$$l::Lexicon))" >> $$d; \
        echo '; for (k in lexicon) { window.Lexicon[k] = lexicon[k] } })()' >> $$d; \
    done

create_distdir :
	$(RM_RF) $(DISTVNAME)
	$(PERLRUN) "-MExtUtils::Manifest=manicopy,maniread" \
		-e "manicopy(maniread(),'$(DISTVNAME)', '$(DIST_CP)');"

distdir : create_distdir build
	$(NOECHO) $(NOOP)

manifest : build

Makefile
}
